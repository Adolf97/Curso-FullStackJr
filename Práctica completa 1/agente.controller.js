const Agentes = require('./agente.model')

const Agente = {
	list: async (req, res) => {
		const agentes = await Agentes.find()
		res.status(200).send(agentes)
	},
	create: async (req, res) => {
		const agente = new Agentes(req.body)
		await agente.save()
		res.status(201).send('agente creado!')
	},
	update: async (req, res) => {
		res.status(204).send('actualizando agente')
	},
	destroy: async (req, res) => {
		const { id } = req.params
		const agente = await Agentes.findOne({ _id: id })
		await agente.remove()
		res.status(204).send('eliminando agente :(')
	}
}

module.exports = Agente
