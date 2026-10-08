export default function Formulario({ texto, setTexto }) {
    return (
        <form className="flex gap-2 p-2 my-4">
            <input 
                className="flex-1 border border-slate-300 rounded p-2"
                placeholder="Ej: Pamplona o Cúcuta"
                value={texto} 
                onChange={(e) => setTexto(e.target.value)}
            />
            <button 
                className="px-3 py-1 rounded border border-slate-300 text-black" 
                type="button"
                onClick={() => setTexto('')}
            >
                Limpiar
            </button>
        </form>
    );
}