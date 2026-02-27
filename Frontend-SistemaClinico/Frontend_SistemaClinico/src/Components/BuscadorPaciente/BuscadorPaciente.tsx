import "./BuscadorPaciente.css";

interface BuscadorPacienteProps {
    value: string;
    onChange: (value: string) => void;
}

export const BuscadorPaciente = ({ value, onChange }: BuscadorPacienteProps) => {
    return (
        <div className="BuscadorPaciente">
            <span className="BuscadorPaciente__icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </span>
            <input
                className="BuscadorPaciente__input"
                type="text"
                placeholder="Buscar paciente por nombre…"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {value && (
                <button
                    className="BuscadorPaciente__clear"
                    onClick={() => onChange("")}
                    title="Limpiar búsqueda"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            )}
        </div>
    );
};
