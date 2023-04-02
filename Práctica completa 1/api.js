const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Agente = require('./agente.controller')
const { Auth, isAuthenticated } = require("./auth.controller")
const port = 3000

mongoose.connect('mongodb+srv://RaDS:b7k8iHeNImaIsLZH@cluster0.6z3yuhj.mongodb.net/agentes?retryWrites=true&w=majority')

app.use(express.json())

app.get('/agentes', isAuthenticated, Agente.list)
app.post('/agentes', isAuthenticated, Agente.create)
app.put('/agentes/:id', isAuthenticated, Agente.update)
app.patch('/agentes/:id', isAuthenticated, Agente.update)
app.delete('/agentes/:id', isAuthenticated, Agente.destroy)

app.post('/login', Auth.login)
app.post('/register', Auth.register)

app.use(express.static('app'))

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`)
})
app.get('*', (req, res) => {
	res.status(404).send('Esta página no existe :(')
})

app.listen(port, () => {
	console.log('Arrancando la aplicación!')
})