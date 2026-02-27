import { useState } from "react";
import { usePaciente } from "../../context/PacienteContext";
import "./PacienteInfoBanner.css";
import { FiUser, FiCalendar, FiPhone, FiChevronDown } from "react-icons/fi";

const sexoLabel: Record<string, string> = {
    Masculino: "Masculino",
    Femenino: "Femenino",
    NoEspecificado: "No especificado",
};

export const PacienteInfoBanner = () => {
    const { pacienteActual } = usePaciente();
    const [expanded, setExpanded] = useState(false);

    if (!pacienteActual) return null;

    const fecha = new Date(pacienteActual.fechaNacimiento).toLocaleDateString(
        "es-MX",
        { day: "2-digit", month: "short", year: "numeric" },
    );

    return (
        <div
            className="PacienteInfoBanner"
            onClick={() => setExpanded((v) => !v)}
            style={{ cursor: "pointer" }}
        >
            <div className="PacienteInfoBanner__icon">
                <FiUser size={18} />
            </div>
            <div className="PacienteInfoBanner__datos">
                <span className="PacienteInfoBanner__nombre">
                    {pacienteActual.nombres} {pacienteActual.apellidos}
                </span>
                {expanded && (
                    <div className="PacienteInfoBanner__chips">
                        <span className="chip">
                            <FiCalendar size={11} />
                            {fecha} &mdash; {pacienteActual.edad} años
                        </span>
                        <span className="chip">{sexoLabel[pacienteActual.sexo]}</span>
                        {pacienteActual.telefono && (
                            <span className="chip">
                                <FiPhone size={11} />
                                {pacienteActual.telefono}
                            </span>
                        )}
                    </div>
                )}
            </div>
            <FiChevronDown
                size={14}
                style={{
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                    color: "#94a3b8",
                    flexShrink: 0,
                    marginLeft: "auto",
                }}
            />
        </div>
    );
};
