const router = require("express").Router()
const User = require("../models/User")
const validation = require("../validation")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")

router.post("/register", async(req, res) => {

    try {
        //Validate data
        const { error } = validation.registerValidation(req.body)
        if (error)
            return res.status(400).send(error.details[0].message)

        //Check if email exists
        const emailExists = await User.findOne({ email: req.body.email })
        if (emailExists)
            return res.status(400).send("Email already exists")

        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        //Everything checks out
        const saved = await newUser.save()
        res.send({ user: saved._id })
    } catch (err) {
        if (err) {
            res.send(`error bro: ${err}`)
            return
        }
        res.send("prazdnej ale")
    }
})

router.post("/login", async(req, res) => {
    //Validation
    const { error } = validation.loginValidation(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    //Check is email exists
    const user = await User.findOne({ email: req.body.email })
    if (!user)
        return res.status(400).send("Email or password is wrong (MAIL)")

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass)
        return res.status(400).send(`Email or password is wrong (PASS)`)

    //Crate and assing token
    const token = JWT.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
})

module.exports = router