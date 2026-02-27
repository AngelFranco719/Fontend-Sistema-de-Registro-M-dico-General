import { useEffect } from "react";
import { HistorialConsultas } from "../../Components/ComponentesHistoriaClinica/HIstorialConsultas/HistorialConsultas";
import { InformacionGeneralPaciente } from "../../Components/ComponentesHistoriaClinica/InformacionGeneralPaciente";
import {
  RegistroFormularios,
  type EstadoFormularios,
} from "../../Components/ComponentesHistoriaClinica/RegistroFormularios";
import type { InformacionGeneralPacienteDTO } from "../../DTOs/PacienteDTOs";
import "./HistoriaClinica.css";
import { usePaciente } from "../../context/PacienteContext";

interface HistoriaClinicaProps {
  onBack?: () => void;
}

export const HistoriaClinica = ({ onBack }: HistoriaClinicaProps) => {
  const formularios: EstadoFormularios[] = [
    { titulo: "Antecedentes Heredofamiliares", estado: "realizado" },
    { titulo: "Antecedentes Patológicos", estado: "realizado" },
    { titulo: "Antecedentes No Patológicos", estado: "realizado" },
  ];

  const { pacienteActual, setPacienteActual } = usePaciente();

  useEffect(() => {
    console.log(pacienteActual);
  }, []);

  return (
    <>
      {onBack && (
        <button className="btn-back-historia" onClick={onBack} title="Volver">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Volver a Pacientes
        </button>
      )}
      {pacienteActual && (
        <div className="HistoriaClinica">
          <div className="column1">
            <InformacionGeneralPaciente paciente={pacienteActual} />
            <RegistroFormularios formularios={formularios} />
          </div>
          <div className="column2">
            <HistorialConsultas />
          </div>
        </div>
      )}
    </>
  );
};
