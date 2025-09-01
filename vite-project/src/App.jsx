
import { Home } from "./componentes/Home"
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      {/* Adicionei Routes sobre os elementos então toda vez q for criar outra pagina ou sla coloca */}
      {/* <Route/> e dentor chama os parametros path que voce cria a rota pra aql pagna e element para voce chamar qual elemento(pagina) quer mostrar nesta rota*/}
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
    </>
  )
}

export default App
