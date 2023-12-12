import User from "../models/user_models.js"
import bcrypt from "bcrypt"
import { request, response } from "express"
import jwt from 'jsonwebtoken'

export const getUser = async(req, res) => {
    try {
        const user = await User.findAll()
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}

export const Register = async(req, res) => {
    const { name, email, password } = req.body
    
    const findUser = await User.findOne({
        where: {
            user_email: req.body.email
        }
    })

    if (findUser) {
        return res.status(409).json({
            message: "User already exist"
        })
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        await User.create({
            user_name: name,
            user_email: email,
            user_password: hashedPassword,
            user_subscribe: 'FALSE'
        })
        res.status(201).json({ msg: "Registration successful" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const Login = async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                user_email: req.body.email
            }
        })

        if(users.length === 0) {
            res.status(404).json({
                message: "User tidak ditemukan"
            })
            return
        }

        const user = users[0]

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.user_password)

        if (!isPasswordMatch) {
            return res.status(401).json({ 
                msg: "Password salah" 
            })
        }

        const jwtSecret = process.env.JWT_SECRET

        if (!jwtSecret) {
            console.error("JWT_SECRET is not set!")
            return res.status(500).json({ msg: "Internal Server Error" })
        }

        res.json({
            data: {
                accessToken: jwt.sign({ id: user.id }, process.env.JWT_SECRET, { 
                    expiresIn: '1h' 
                })
            }
        })
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Internal Server Error" })
    }
}

export const updatedSubscribe = async (req, res) => {
    const name = req.body.name
    if (name === "") {
        return res.status(400).json({
            message: "Username is null or undefined"
        })
    }
    try {
        await User.update(
            { user_subscribe: 'true' },
            {
                where: {
                    user_name: name,
                    user_subscribe: 'false'
                }
            }
        )
        return res.status(200).json({ message: 'Berhasil Subscribe' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error
        })
    }
}

// const updatedRows = await User.update(
//     { subscribe: 'TRUE' },
//     {
//         where: {
//         email: email,
//         subscribe: 'FALSE',
//         },
//     }
    
// )