export default function Ciudad({ ciudad, onSeleccionar }) {
  return (
    <li 
      className="mb-2 p-2 border-b cursor-pointer hover:bg-slate-100 transition-colors"
      onClick={() => onSeleccionar(ciudad)}
    >
      {ciudad.name}, {ciudad.admin1}, {ciudad.country}
    </li>
  );
}