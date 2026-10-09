import { useState, useEffect } from 'react';

export function useDebounce(valor, ms) {
    const [retraso, setRetraso] = useState(valor);

    useEffect(() => {
        const id = setTimeout(() => setRetraso(valor), ms);
        return () => clearTimeout(id);
    }, [valor, ms]);

    return retraso;
}