import type { InformacionGeneralPacienteDTO } from "../../DTOs/PacienteDTOs";
import "./InformacionPaciente.css";

interface InformacionPacienteProps {
    paciente: InformacionGeneralPacienteDTO;
}

export const InformacionPaciente = ({ paciente }: InformacionPacienteProps) => {
    return (
        <div className="informacionPacienteContainer">
            <div className="seccionPaciente">
                <h2 className="pacienteNombre">{paciente.nombres} {paciente.apellidos}</h2>

                <div className="datosPersonalesGrid">
                    <div className="datoRow">
                        <label>Edad:</label>
                        <span>{paciente.edad} años</span>
                    </div>
                    <div className="datoRow">
                        <label>Sexo:</label>
                        <span>{paciente.sexo}</span>
                    </div>
                    <div className="datoRow">
                        <label>F. Nacimiento:</label>
                        <span>{paciente.fechaNacimiento}</span>
                    </div>
                    <div className="datoRow">
                        <label>Teléfono:</label>
                        <span>{paciente.telefono || "N/A"}</span>
                    </div>
                    <div className="datoRow contactoEmergencia">
                        <label>Emergencia:</label>
                        <span>{paciente.contactoEmergencia || "N/A"}</span>
                    </div>
                </div>
            </div>

            <div className="resumenesContainer">
                <div className="resumenCard">
                    <h3>Resumen Antecedentes Heredofamiliares</h3>
                    <div className="resumenPlaceholder">Sin antecedentes registrados</div>
                </div>

                <div className="resumenCard">
                    <h3>Resumen Antecedentes No Patológicos</h3>
                    <div className="resumenPlaceholder">Sin antecedentes registrados</div>
                </div>

                <div className="resumenCard">
                    <h3>Resumen Antecedentes Patológicos</h3>
                    <div className="resumenPlaceholder">Sin antecedentes patológicos registrados</div>
                </div>
            </div>
        </div>
    );
};
