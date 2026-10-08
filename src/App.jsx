import { useState, useEffect } from 'react'
import { useFetch } from './hooks/UseFetch.jsx';
import Formulario from './components/Formulario.jsx'
import ListaCiudades from './components/ListaCiudades.jsx';

function App() {
  const [texto, setTexto] = useState('');

  const url = texto.length >= 3 
    ? `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(texto)}&count=5&language=es` 
    : null;

  const ciudades = useFetch(url);

  return (
    <div>
      <h1>
        Clima
      </h1>
      <Formulario texto={texto} setTexto={setTexto}/>
      <div className="mt-4">
        <ListaCiudades 
          ciudades={ciudades.datos} 
          cargando={ciudades.cargando} 
          error={ciudades.error} 
          texto={texto} 
        />
      </div>
    </div>  
  )
}

export default App
