const User = require("../models/userModel");
const bcrypt = require('bcryptjs')

exports.signUp = async (req, res, next) => {
    try {
        const { username, password } = req.body

        const hashPassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({
            username,
            password: hashPassword
        })

        req.session.user = newUser

        res.status(200).json({
            status: 'success',
            data: {
                newUser
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            err: err
        })
    }

}

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({
            username
        })
        if (!user) {
            res.status(200).json({
                status: 'fail',
                message: "User not found"
            })
        }

        let isCorrect = await bcrypt.compare(password, user.password)

        if (isCorrect) {
            req.session.user = user
            res.status(200).json({
                status: 'success',
                message: "Login successfully"
            })
        } else {
            res.status(400).json({
                status: 'fail',
                message: "Incorrect username or password."
            })
        }


    } catch (err) {
        res.status(400).json({
            status: 'fail',
            err: err
        })
    }

}
