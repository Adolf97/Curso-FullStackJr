const mongoose = require('mongoose') 


const Agentes = mongoose.model('Agente', {
	name: { type: String, required: true, minLength: 3 },
	type: { type: String, required: true, minLength: 3 },
})

module.exports = Agentes
