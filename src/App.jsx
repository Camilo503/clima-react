import { useState } from 'react'
import Formulario from './components/Formulario.jsx'

function App() {
  const listaClimas = [];
  const [climas, setClimas] = useState(listaClimas);


  return (
    <div>
      <h1>
        Clima
      </h1>
      <Formulario/>
    </div>  
  )
}

export default App
