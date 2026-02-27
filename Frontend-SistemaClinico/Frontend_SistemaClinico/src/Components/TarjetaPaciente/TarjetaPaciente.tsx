import type {
  DashboardPacienteInformationDTO,
  InformacionGeneralPacienteDTO,
} from "../../DTOs/PacienteDTOs";
import "./TarjetaPaciente.css";

interface TarjetaPacienteProps {
  paciente: DashboardPacienteInformationDTO;
  onVerPerfil?: (paciente: DashboardPacienteInformationDTO) => void;
}

const sexoIcon = (sexo: string) => {
  if (sexo === "Masculino") return "♂";
  if (sexo === "Femenino") return "♀";
  return "—";
};

export const TarjetaPaciente = ({
  paciente,
  onVerPerfil,
}: TarjetaPacienteProps) => {
  return (
    <div className="TarjetaPaciente">
      <div className="TarjetaPaciente__info">
        <p className="TarjetaPaciente__nombre">{paciente.nombre}</p>

        <div className="TarjetaPaciente__badges">
          <span className="badge badge--age">{paciente.edad} años</span>
          <span
            className={`badge badge--sexo ${
              paciente.sexo === "Masculino"
                ? "badge--masculino"
                : paciente.sexo === "Femenino"
                  ? "badge--femenino"
                  : ""
            }`}
          >
            {sexoIcon(paciente.sexo)}{" "}
            {paciente.sexo === "NoEspecificado" ? "N/E" : paciente.sexo}
          </span>
        </div>

        <div className="TarjetaPaciente__meta">
          <span className="meta-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.1 11.74 19.79 19.79 0 0 1 1.08 3.1 2 2 0 0 1 3.07 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
            </svg>
            {paciente.telefono ?? "Sin teléfono"}
          </span>
          <span className="meta-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Registro: {paciente.fechaRegistro}
          </span>
        </div>
      </div>

      <button
        className="TarjetaPaciente__btn"
        onClick={() => onVerPerfil?.(paciente)}
      >
        Ver perfil
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
};
