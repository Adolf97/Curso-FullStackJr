const loadInitialTemplate = () => {
	const template = `
		<h1>Agentes</h1>
		<form id="agente-form">
			<div>
				<label>Nombre</label>
				<input name="name" />
			</div>
			<div>
				<label>Tipo</label>
				<input name="type" />
			</div>
			<button type="submit">Enviar</button>
		</form>
		<ul id="agente-list"></ul>
	`
	const body = document.getElementsByTagName('body')[0]
	body.innerHTML = template
}

const getAgentes = async () => {
	const response = await fetch('/agentes')
	const agentes = await response.json()
	const template = agente => `
		<li>
			${agente.name} ${agente.type} <button data-id="${agente._id}">Eliminar</button>
		</li>
	`

	const agenteList = document.getElementById('agente-list')
	agenteList.innerHTML = agentes.map(agente => template(agente)).join('')
	agentes.forEach(agente => {
		agenteNode = document.querySelector(`[data-id="${agente._id}"]`)
		animalNode.onclick = async e => {
			await fetch(`/agentes/${agente._id}`, {
				method: 'DELETE',
			})
			agenteNode.parentNode.remove()
			alert('Eliminado con éxito')
		}
	})
}

const addFormListener = () => {
	const agenteForm = document.getElementById('agente-form')
	agenteForm.onsubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData(agenteForm)
		const data = Object.fromEntries(formData.entries())
		await fetch('/agentes', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		agenteForm.reset()
		getAgentes()
	}
}

const checkLogin = () => {
	localStorage.getItem("jwt")
}

const agentesPage = () => {
	loadInitialTemplate()
	addFormListener()
	getAgentes()
}

const loadLoginTemplate = () => {
	const template = `
		<h1>Login</h1>
		<form id="login-form">
			<div>
				<label>Correo</label>
				<input name="email" />
			</div>
			<div>
				<label>Contraseña</label>
				<input name="password" />
			</div>
			<button type="submit">Enviar</button>
		</form>
		<div id="error"></div>
	`

	const body = document.getElementsByTagName('body')[0]
	body.innerHTML = template
}

window.onload = () => {
	const isLoggedIn = checkLogin()
	if(isLoggedIn) {
		agentesPage()
	} else {
		loadLoginTemplate()
	}
}
