const router = require('express').Router()
const bcrypt = require('bcryptjs')

const User = require('../models/User')

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    try {
        let user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({ error: 'User already exists' })
        }
        const hashedPsw = await bcrypt.hash(password, 10)
        user = new User({
            username,
            email,
            password: hashedPsw
        })

        const savedUser = await user.save()

        res.status(201).json({
            authorized: 'Successfully Registered',
            user_id: savedUser._id
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong on server' })
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        let user = await User.findOne({ username })

        if (!user) {
            return res.status(404).json({ error: 'such user doesn\'t exist check your credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(404).json({ error: 'such user doesn\'t exist check your credentials' })
        }

        res.status(200).json({
            authorized: 'Welcome Back User',
            user_id: user._id
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong on server' })
    }
})

module.exports = router