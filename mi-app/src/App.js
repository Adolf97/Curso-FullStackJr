import './App.css';

const estilos = (bg = '#333') => ({
  backgroundColor: bg,
  color: "#fff",
  padding: "15px 25px",
  margin: "20px 0",
})

const estilos2 = {
  boxShadow: "0 5px 5px #000",
}

const Li = ({ children }) => {
  return(
    <li style={{ ...estilos(), ...estilos2 }} className='clase-li'>{children}</li>
  )
}

const App = () => {
  const valor = 'triste'
  return (
    <ul style={estilos('#056')} className='clase-css'>
      <Li estado='feliz'>valor de li: {valor}</Li>
    </ul>
  );
}

export default App;
