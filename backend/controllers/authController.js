import { hashPassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"

export const registerController = async (req, res) => {
    try {
        const {name, email, password, phone, address} = req.body
        // validations
        if(!name && !email && !password && !phone && !address) {
            return res.send({error : "All credientials are required"})
        }

        // check user
        const existingUser = await userModel.findOne({email})

        // existing user
        if(existingUser) {
            return res.status(200).send({
                success: true,
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

