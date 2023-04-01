const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { expressjwt: ejwt } = require("express-jwt")
const User = require("./user")

mongoose.connect("mongodb+srv://RaDS:b7k8iHeNImaIsLZH@cluster0.6z3yuhj.mongodb.net/auth?retryWrites=true&w=majority")

const app = express()
app.use(express.json())

const validateJwt = ejwt({ secret: 'mi-string-secreto', algorithms: ['HS256'] })
const signToken = _id => jwt.sign({ _id }, 'mi-string-secreto')

app.post("/register", async(req, res) => {
    const { body } = req
    try {
        const isUser = await User.findOne({ email: body.email })
        if (isUser) {
            return res.status(403).send("Usuario ya existe")
        }
        const salt = await bcrypt.genSalt()
        const hashed = await bcrypt.hash(body.password, salt)
        const user = await User.create({ email: body.email, password: hashed, salt })
        const signed = signToken(user._id)
        res.status(201).send(signed)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})

app.post("/login", async (req, res) => {
    const { body } = req
    try {
        const user = await User.findOne({ email: body.email })
        if (!user) {
            res.status(403).send("Usuario y/o contraseña inválida")
        } else {
            const isMatch = await bcrypt.compare(body.password, user.password)
            if (isMatch) {
                const signed = signToken(user._id)
                res.status(200).send(signed)
            } else {
                res.status(403).send("Usuario y/o contraseña inválida")
            }
        }
    } catch(err) {
        res.status(500).send(err.message)
    }
})

app.get("/lele", validateJwt , (req, res, next) => {
    console.log("lala", req.user)
    res.send("ok")
})
app.listen(3000, () => {
    console.log("Listening in port 3000")
})