import { useState, useEffect } from "react";
import "./ConsultaClinica.css";
import { PadecimientoActual } from "./PadecimientoActual";
import { InterrogatorioDirigido } from "./InterrogatorioDirigido";
import { ExploracionFisica } from "./ExploracionFisica";
import { InformacionPaciente } from "./InformacionPaciente";
import type { ConsultaClinicaStateDTO } from "../../DTOs/ConsultaClinicaDTO";
import { usePaciente } from "../../context/PacienteContext";

type TabType = "Paciente" | "Padecimiento" | "Interrogatorio" | "Exploracion";

export const ConsultaClinica = () => {
  const [dateTime, setDateTime] = useState(() => ({
    fecha: new Date().toLocaleDateString(),
    hora: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime({
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [activeTab, setActiveTab] = useState<TabType>("Paciente");
  const { pacienteActual } = usePaciente();

  const [consultaState, setConsultaState] = useState<ConsultaClinicaStateDTO>({
    paciente: pacienteActual,
    padecimientoActual: {
      motivoConsulta: "",
      tiempoInicio: "",
      desencadenante: {
        respuesta: null,
        detalles: "",
      },
      sintomas: [{ descripcion: "", severidad: "", agravantes: "" }],
    },
    interrogatorioDirigido: null, // component will init it
    exploracionFisica: null, // component will init it
  });

  useEffect(() => {
    console.log(`Estado Global en Tab ${activeTab}:`, consultaState);
  }, [activeTab, consultaState]);

  return (
    <div className="consultaClinicaDiv">
      <div className="consultaTituloHeader">
        <h2 className="consultaTitulo">Consulta Clínica</h2>
        <span className="consultaDateTime">
          {dateTime.fecha} • {dateTime.hora}
        </span>
      </div>

      <div className="tabsContainer">
        <button
          className={`tabButton ${activeTab === "Paciente" ? "active" : ""}`}
          onClick={() => setActiveTab("Paciente")}
        >
          Información Paciente
        </button>
        <button
          className={`tabButton ${activeTab === "Padecimiento" ? "active" : ""}`}
          onClick={() => setActiveTab("Padecimiento")}
        >
          Padecimiento Actual
        </button>
        <button
          className={`tabButton ${activeTab === "Interrogatorio" ? "active" : ""}`}
          onClick={() => setActiveTab("Interrogatorio")}
        >
          Interrogatorio Dirigido
        </button>
        <button
          className={`tabButton ${activeTab === "Exploracion" ? "active" : ""}`}
          onClick={() => setActiveTab("Exploracion")}
        >
          Exploración Física
        </button>
      </div>

      <div className="tabContentContainer">
        {activeTab === "Paciente" && pacienteActual !== null && (
          <InformacionPaciente paciente={pacienteActual} />
        )}
        {activeTab === "Padecimiento" && (
          <PadecimientoActual
            state={consultaState.padecimientoActual}
            onChange={(newState) =>
              setConsultaState((prev) => ({
                ...prev,
                padecimientoActual: newState,
              }))
            }
          />
        )}
        {activeTab === "Interrogatorio" && (
          <InterrogatorioDirigido
            state={consultaState.interrogatorioDirigido}
            onChange={(newState) =>
              setConsultaState((prev) => ({
                ...prev,
                interrogatorioDirigido: newState,
              }))
            }
          />
        )}
        {activeTab === "Exploracion" && (
          <ExploracionFisica
            state={consultaState.exploracionFisica}
            onChange={(newState) =>
              setConsultaState((prev) => ({
                ...prev,
                exploracionFisica: newState,
              }))
            }
          />
        )}
      </div>
    </div>
  );
};
