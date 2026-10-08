import { useState, useEffect } from 'react'
import Formulario from './components/Formulario.jsx'
import ListaCiudades from './components/ListaCiudades.jsx';

function App() {
  const [texto, setTexto] = useState('');
  
  const [ciudades, setCiudades] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (texto.length < 3) {
      setCiudades([]);
      setError(null);
      return;
    }

    const control = new AbortController();

    const buscarCiudades = async () => {
      setCargando(true);
      setError(null);

      try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(texto)}&count=5&language=es`;
        
        const r = await fetch(url, { signal: control.signal });
        if (!r.ok) throw new Error("Error al consultar la API");
        
        const d = await r.json();
        setCiudades(d.results ?? []); 
        
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        if (!control.signal.aborted) setCargando(false);
      }
    };

    buscarCiudades();

    return () => control.abort();
  }, [texto]);

  return (
    <div>
      <h1>
        Clima
      </h1>
      <Formulario texto={texto} setTexto={setTexto}/>
      <div className="mt-4">
        <ListaCiudades 
          ciudades={ciudades} 
          cargando={cargando} 
          error={error} 
          texto={texto} 
        />
      </div>
    </div>  
  )
}

export default App
