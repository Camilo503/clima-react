export function describirClima(codigo) {
  if (codigo === 0) return "☀️ Despejado";
  if (codigo <= 3) return "⛅ Parcialmente nublado";
  if (codigo <= 48) return "🌫️ Niebla";
  if (codigo <= 57) return "🌦️ Llovizna";
  if (codigo <= 67) return "🌧️ Lluvia";
  if (codigo <= 77) return "❄️ Nieve";
  if (codigo <= 82) return "🌧️ Chubascos";
  return "⛈️ Tormenta";
}

export function obtenerDiaCorto(fechaString) {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const fecha = new Date(fechaString + 'T00:00:00');
  return dias[fecha.getDay()];
}