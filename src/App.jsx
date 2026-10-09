import { useState, useEffect, useRef } from 'react';
import { useFetch } from './hooks/UseFetch.jsx';
import Formulario from './components/Formulario.jsx';
import ListaCiudades from './components/ListaCiudades.jsx';
import Pronostico from './components/Pronostico.jsx';
import { useDebounce } from './hooks/useDebounce.jsx';

function App() {
  const [texto, setTexto] = useState('');
  const [ciudadActual, setCiudadActual] = useState(null);

  const textoRetrasado = useDebounce(texto, 400);
  
  const urlCiudades = textoRetrasado.length >= 3 
    ? `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(texto)}&count=5&language=es` 
    : null;
  const reqCiudades = useFetch(urlCiudades);
  const listaCiudades = reqCiudades.datos?.results || [];

  const urlClima = ciudadActual 
    ? `https://api.open-meteo.com/v1/forecast?latitude=${ciudadActual.latitude}&longitude=${ciudadActual.longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
    : null;
  const reqClima = useFetch(urlClima);

  const abrirApp = useRef(null);
  useEffect(() => {
  abrirApp.current.focus();
  }, []);

  function limpiar() {
  setTexto('');
  setCiudadActual(null);
  abrirApp.current.focus();
  }

  return (
    <div>
      <h1>
        Clima
      </h1>
      <Formulario texto={texto} setTexto={setTexto} abrirApp={abrirApp} limpiar={limpiar}/>
      <div className="mt-4">
        <ListaCiudades 
          ciudades={listaCiudades} 
          cargando={reqCiudades.cargando} 
          error={reqCiudades.error} 
          texto={textoRetrasado} 
          onSeleccionar={setCiudadActual}
        />
      </div>
      {ciudadActual && (
         <div className="mt-6">
            <Pronostico 
              ciudad={ciudadActual} 
              clima={reqClima.datos} 
              cargando={reqClima.cargando} 
              error={reqClima.error} 
            />
         </div>
      )}
    </div>  
  );
}

export default App
