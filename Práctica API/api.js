const express = require("express")
const mongoose = require("mongoose")
const user = require("./user.controller")
const app = express()
const port = 3000

mongoose.connect('mongodb+srv://RaDS:b7k8iHeNImaIsLZH@cluster0.6z3yuhj.mongodb.net/miapp?retryWrites=true&w=majority')

app.get("/", user.list)
app.get("/:id", user.get)
app.post("/", user.create)
app.put("/:id", user.update)
app.patch("/:id", user.update)
app.delete("/:id", user.destroy)

app.get("*", (req, res) => {
    res.status(404).send("Esta página no existe")
})

app.listen(port, () => {
    console.log("Arrancando la aplicación")
})