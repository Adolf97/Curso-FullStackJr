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

const loadRegisterTemplate = () => {
	const template = `
		<h1>Register</h1>
		<form id="register-form">
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
		<a href="#" id="login">Iniciar Sesión</a>
		<div id="error"></div>
	`

	const body = document.getElementsByTagName('body')[0]
	body.innerHTML = template
}

const addRegisterListener = () => {
	const registerForm = document.getElementById('register-form')
	registerForm.onsubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData(registerForm)
		const data = Object.fromEntries(formData.entries())

		const response = await fetch('/register', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			}
		})
		const responseData = await response.text()
		if(response.status >= 300) {
			const errorNode = document.getElementById("error")
			errorNode.innerHTML = responseData;
		} else {
			console.log(responseData)
		}
	}
}
const goToLoginListener = () => {}

const registerPage = () => {
	console.log("Página de registro")
	loadRegisterTemplate()
	addRegisterListener()
	goToLoginListener()
}

const loginPage = () => {
	loadLoginTemplate()
	addLoginListener()
	goToRegisterListener()
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
		<a href="#" id="register">Registrarse</a>
		<div id="error"></div>
	`

	const body = document.getElementsByTagName('body')[0]
	body.innerHTML = template
}

const goToRegisterListener = () => {
	const gotoRegister = document.getElementById('register')
	gotoRegister.onclick = (e) => {
		e.preventDefault()
		registerPage()
	}
}

const addLoginListener = () => {
	const loginForm = document.getElementById('login-form')
	loginForm.onsubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData(loginForm)
		const data = Object.fromEntries(formData.entries())

		const response = await fetch('/login', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			}
		})
		const responseData = await response.text()
		if(response.status >= 300) {
			const errorNode = document.getElementById("error")
			errorNode.innerHTML = responseData;
		} else {
			console.log(responseData)
		}
	}
}

window.onload = () => {
	const isLoggedIn = checkLogin()
	if(isLoggedIn) {
		agentesPage()
	} else {
		loginPage()
	}
}
