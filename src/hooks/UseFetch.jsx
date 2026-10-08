import { useState, useEffect } from 'react';

export function useFetch(url) {
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) {
            setDatos([]);
            setError(null);
            return;
        }

        const control = new AbortController();

        const fetchData = async () => {
            setCargando(true);
            setError(null);

            try {
                const r = await fetch(url, { signal: control.signal });
                if (!r.ok) throw new Error("Error al consultar la API");
                
                const d = await r.json();
                setDatos(d.results ?? []);
                
            } catch (e) {
                if (e.name !== "AbortError") {
                    setError(e.message);
                }
            } finally {
                if (!control.signal.aborted) {
                    setCargando(false);
                }
            }
        };

        fetchData();

        return () => control.abort();
    }, [url]);

    return { datos, cargando, error };
}