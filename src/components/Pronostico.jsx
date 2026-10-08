import { describirClima, obtenerDiaCorto } from '../clima.jsx';

export default function Pronostico({ ciudad, clima, cargando, error }) {
    if (cargando) return <p>Cargando pronóstico...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (!clima || !clima.current || !clima.daily) return null;

    const { current, daily } = clima;

    // Lógica para la semana (Máxima, mínima y día más caluroso)
    const maxSemana = Math.max(...daily.temperature_2m_max);
    const minSemana = Math.min(...daily.temperature_2m_min);
    const indiceMasCaluroso = daily.temperature_2m_max.indexOf(maxSemana);
    const diaMasCaluroso = daily.time[indiceMasCaluroso];

    const sacarEmoji = (codigo) => describirClima(codigo).split(' ')[0];

    return (
        <div className="border border-slate-200 rounded p-4 space-y-2">
          <p className="text-lg font-bold">{ciudad.name}</p>
          <p>
            <span className="text-3xl font-bold">{current.temperature_2m} °C</span> · {describirClima(current.weather_code)} · viento {current.wind_speed_10m} km/h
          </p>
          <p className="bg-amber-50 rounded p-2 text-sm text-slate-800">
            Esta semana: máxima {maxSemana} °C, mínima {minSemana} °C. El día más caluroso es el {diaMasCaluroso}.
          </p>
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {daily.time.map((fecha, i) => (
              <div key={fecha} className="border border-slate-200 rounded p-1">
                {obtenerDiaCorto(fecha)}<br/>
                {sacarEmoji(daily.weather_code[i])}<br/>
                {Math.round(daily.temperature_2m_min[i])}–{Math.round(daily.temperature_2m_max[i])}
              </div>
            ))}
          </div>
        </div>
    );
}