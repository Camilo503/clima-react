export default function Ciudad({ ciudad }) {
  return (
    <li className="mb-2 p-2 border-b">
      {ciudad.name}, {ciudad.admin1}, {ciudad.country}
    </li>
  );
}