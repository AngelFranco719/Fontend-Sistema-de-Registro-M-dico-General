import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BuscadorPaciente } from "../../Components/BuscadorPaciente/BuscadorPaciente";
import { TarjetaPaciente } from "../../Components/TarjetaPaciente/TarjetaPaciente";
import { usePaciente } from "../../context/PacienteContext";
import {
  type GetAllPacientesDashboardDTO,
  type DashboardPacienteInformationDTO,
  isGetAllPacientesDashboardDTO,
} from "../../DTOs/PacienteDTOs";
import "./ManagerDashboard.css";
import { useGetAllPacientesDashboard } from "../../Hooks/usePacienteAPI";
import { useGetHistoriaClinica } from "../../Hooks/useHistoriaClinica";
import { isGetHistoriaClinicaDTO } from "../../DTOs/HistoriaClinicaDTOs";

export const ManagerDashboard = () => {
  const navigate = useNavigate();
  const { setPacienteActual, setHistoriaClinica, pacienteActual } =
    usePaciente();

  const [pacientes, setPacientes] = useState<GetAllPacientesDashboardDTO>();
  const [selectedPaciente, setSelectedPaciente] = useState<number>(0);
  const [query, setQuery] = useState<string>("");

  const { data: dashboardData, isLoading: dashboardLoading } =
    useGetAllPacientesDashboard();

  const { data: historiaData, isLoading: historiaLoading } =
    useGetHistoriaClinica(selectedPaciente, {
      enabled: !!selectedPaciente && selectedPaciente !== 0,
    });

  useEffect(() => {
    if (isGetHistoriaClinicaDTO(historiaData)) {
      setPacienteActual(historiaData.informacionPaciente);
      setHistoriaClinica(historiaData);
      navigate("/historia");
    }
  }, [historiaData]);

  useEffect(() => {
    if (isGetAllPacientesDashboardDTO(dashboardData)) {
      setPacientes(dashboardData);
    }
  }, [dashboardData]);

  useEffect(() => {
    console.log(pacientes);
  }, [pacientes]);
  const pacientesFiltrados =
    pacientes != undefined
      ? pacientes.allPacientes.filter((p: DashboardPacienteInformationDTO) => {
          const texto = `${p.nombre}`.toLowerCase();
          return texto.includes(query.toLowerCase());
        })
      : [];

  function handleVerPerfil(paciente: DashboardPacienteInformationDTO) {
    setSelectedPaciente(paciente.pacienteId);
  }

  if (dashboardLoading) {
    return (
      <div className="ManagerDashboard">
        <header className="ManagerDashboard__header">
          <div className="ManagerDashboard__header-text">
            <h1 className="ManagerDashboard__title">Pacientes</h1>
            <p className="ManagerDashboard__subtitle">
              Cargando información...
            </p>
          </div>
        </header>

        <div className="ManagerDashboard__loading">
          <div className="ManagerDashboard__spinner"></div>
          <p>Obteniendo listado de pacientes...</p>
        </div>

        <div
          className="ManagerDashboard__grid"
          style={{ opacity: 0.3, pointerEvents: "none" }}
        >
          {[1, 2, 3].map((i) => (
            <div key={i} className="ManagerDashboard__skeleton-card"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="ManagerDashboard">
      <header className="ManagerDashboard__header">
        <div className="ManagerDashboard__header-text">
          <h1 className="ManagerDashboard__title">Pacientes</h1>
          <p className="ManagerDashboard__subtitle">
            Gestiona el registro y perfil de tus pacientes
          </p>
        </div>

        <button
          className="ManagerDashboard__btn-nuevo btn btn-primary"
          onClick={() => navigate("/registrar")}
        >
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
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nuevo Paciente
        </button>
      </header>

      <div className="ManagerDashboard__toolbar">
        <BuscadorPaciente value={query} onChange={setQuery} />
        <span className="ManagerDashboard__count">
          {pacientesFiltrados.length}{" "}
          {pacientesFiltrados.length === 1 ? "paciente" : "pacientes"}
        </span>
      </div>
      <div className="ManagerDashboard__list">
        {pacientesFiltrados.length > 0 ? (
          <div className="ManagerDashboard__grid">
            {pacientesFiltrados.map(
              (p: DashboardPacienteInformationDTO, i: number) => (
                <TarjetaPaciente
                  key={i}
                  paciente={p}
                  onVerPerfil={handleVerPerfil}
                />
              ),
            )}
          </div>
        ) : (
          <div className="ManagerDashboard__empty">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c5cde8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p>
              No se encontraron pacientes con "<strong>{query}</strong>"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
