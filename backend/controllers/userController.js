const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({ name, email, password: hashedPassword })
        await user.save()

        res.status(201).json({ message: "New user created", user })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "Invalid email" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" })
        }
        
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
            
        )
        res.json({message: "Logged in successfully", token})
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

module.exports = { registerUser, loginUser }