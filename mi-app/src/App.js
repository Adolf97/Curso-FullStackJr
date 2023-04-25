//Esta forma de trabajar con componentes ya está obsoleta.
// NO USARLA COMO REFERENCIA
// Únicamente se está poniendo porque es parte del curso

import { Component } from "react"

class App extends Component {
  state = {
    valor: 3
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <p>Hola Mundo</p>
        <button className={`${this.state.valor}`} onClick={() => this.setState({valor: 2})}>
          Enviar
        </button>
      </div>
    )
  }
}

export default App