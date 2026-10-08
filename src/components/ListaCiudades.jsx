import Ciudad from './Ciudad.jsx';

export default function ListaCiudades({ ciudades, cargando, error, texto, onSeleccionar }) {
  if (cargando) return <p>Buscando…</p>;
  
  if (error) return <p className="text-red-500">Error: {error}</p>;
  
  if (texto.length >= 3 && ciudades.length === 0) return <p>Sin resultados</p>;

  if (ciudades.length === 0) return null;

  return (
    <ul>
      {ciudades.map((ciudad) => (
        <Ciudad key={ciudad.id} ciudad={ciudad} onSeleccionar={onSeleccionar}/>
      ))}
    </ul>
  );
}