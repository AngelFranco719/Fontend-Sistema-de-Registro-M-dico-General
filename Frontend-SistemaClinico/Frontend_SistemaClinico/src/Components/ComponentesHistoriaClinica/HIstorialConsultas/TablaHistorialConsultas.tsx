import "./TablaHistorialConsultas.css";

export interface HistorialConsultaItem {
    id: string;
    fecha: string;
    motivoPrincipal: string;
    tratamiento: string;
}

interface TablaHistorialConsultasProps {
    consultas: HistorialConsultaItem[];
    onVerConsulta: (id: string) => void;
}

export const TablaHistorialConsultas = ({
    consultas,
    onVerConsulta,
}: TablaHistorialConsultasProps) => {
    if (!consultas || consultas.length === 0) {
        return (
            <div className="tablaHistorialContainer">
                <div className="emptyStateTable">
                    <span className="emptyIcon">📋</span>
                    <p>No hay consultas previas registradas.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="tablaHistorialContainer">
            <div className="tablaWrapper">
                <table className="tablaHistorial">
                    <thead>
                        <tr>
                            <th className="col-fecha">Fecha</th>
                            <th className="col-motivo">Motivo Principal</th>
                            <th className="col-tratamiento">Tratamiento</th>
                            <th className="col-accion">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consultas.map((consulta, index) => (
                            <tr
                                key={consulta.id}
                                className={index % 2 === 0 ? "fila-par" : "fila-impar"}
                            >
                                <td className="fechaDato">
                                    <span className="fechaChip">{consulta.fecha}</span>
                                </td>
                                <td className="motivoDato">{consulta.motivoPrincipal}</td>
                                <td className="tratamientoDato">{consulta.tratamiento}</td>
                                <td className="accionDato">
                                    <button
                                        className="btnVerConsulta"
                                        onClick={() => onVerConsulta(consulta.id)}
                                    >
                                        Ver Consulta
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="tablaFooter">
                <span>{consultas.length} consulta{consultas.length !== 1 ? "s" : ""} registrada{consultas.length !== 1 ? "s" : ""}</span>
            </div>
        </div>
    );
};
