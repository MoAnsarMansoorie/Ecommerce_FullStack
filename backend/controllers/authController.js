import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"
import JWT from "jsonwebtoken"

export const registerController = async (req, res) => {
    try {
        const {name, email, password, phone, address} = req.body
        // validations
        if(!name && !email && !password && !phone && !address) {
            return res.send({message : "All credientials are required"})
        }

        // check user
        const existingUser = await userModel.findOne({email})

        // existing user
        if(existingUser) {
            return res.status(200).send({
                success: false,
                message : "Already registerd, Please LogIn"
            })
        }

        // register user
        const hashedPassword = await hashPassword(password)

        // save
        const user = await new userModel({name, email, phone, address, password: hashedPassword}).save()

        res.status(200).send({
            success: true,
            message: "User Registerd successfully",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in registration",
            error
        })
    }
}

// POST || LOGIN
export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body
        
        // validation
        if(!email && !password) {
            return res.status(404).send({
                success: false,
                message: "All crediantials are required"
            })
        }

        // checking user
        const user = await userModel.findOne({email})
        if(!user) {
            return res.status(400).send({
                success: false,
                message: "Email is not registered"
            })
        }

        // matching
        const match = await comparePassword(password, user.password)
        if(!match) {
            return res.status(404).send({
                success: false,
                message: "Invalid password or email"
            })
        }

        // token
        const token = await JWT.sign(
            {_id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message : "Error in LogIn",
            error
        })
    }
}

// TEST CONTROLLER
export const testController = (req, res) => {
    try {
        res.status(200).send({
            success: true,
            message: "Protected Routes"
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Invalid Token",
            error
        })
    }
}
