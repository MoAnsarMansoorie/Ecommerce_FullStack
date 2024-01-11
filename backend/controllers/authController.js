import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"
import JWT from "jsonwebtoken"

export const registerController = async (req, res) => {
    try {
        const {name, email, password, phone, address, answer} = req.body
        // validations
        if(!name && !email && !password && !phone && !address && !answer) {
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
        const user = await new userModel({name, email, phone, address, password: hashedPassword, answer}).save()

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
                address: user.address,
                role: user.role
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

// POST || FORGOT_PASSWORD
export const forgotPasswordController = async (req, res) => {
    try {
        const {email, answer, newPassword} = req.body
        if(!email && !answer && !newPassword) {
            res.status(400).send({message: "All crediantials are required!"})
        }

        // check
        const user = await userModel.findOne({email, answer})

        // validaton
        if(!user) {
            return res.status(400).send({
                success: false,
                message: "Wrong email or answer"
            })
        }

        // new password
        const hashed = await hashPassword(newPassword)

        // update password
        await userModel.findByIdAndUpdate(user._id, {password: hashed})
        res.status(200).send({
            success: true,
            message: "Password reset successfully!"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong!",
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

// UPDATE || PROFILE
export const updateProfileController = async (req, res) => {
    try {
        const {name, email, password, address, phone} = req.body
        const user = await userModel.findById(req.user._id)
        // password
        if(!password && password.length<6){
            return res.json({error: "Password is required and length should be gte than 6"})
        }

        const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
        
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            message: "Error while updating profile",
            error
        })
    }
}

