import { useState } from 'react';

export default function Formulario() {
    const [valor, setValor] = useState('');

    const consultarClimas = () => {
        if(valor.t)
    }

    return (
        <form className="flex gap-2 p-2">
            <input className="flex-1 border border-slate-300 rounded p-2 ring-2 ring-red-300"
                value={valor} onChange={(e) => {
                    setValor(e.target.value);
                    consultarClimas();
                }} 
            />
            <button class="px-3 py-1 rounded border border-slate-300 text-black" type="button">Limpiar</button>
        </form>
    );
}