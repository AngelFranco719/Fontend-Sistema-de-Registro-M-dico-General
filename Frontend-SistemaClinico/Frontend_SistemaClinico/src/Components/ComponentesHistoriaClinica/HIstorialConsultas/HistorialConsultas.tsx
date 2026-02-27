import { useNavigate } from "react-router-dom";
import "./HistorialConsultas.css";
import { SearchConsulta } from "./SearchConsulta";
import {
  TablaHistorialConsultas,
  type HistorialConsultaItem,
} from "./TablaHistorialConsultas";

const diagnosticos: string[] = ["VARICELA", "HERPES ZOSTER", "CANDIDIASIS"];

const consultasMock: HistorialConsultaItem[] = [
  {
    id: "1",
    fecha: "15/01/2026",
    motivoPrincipal: "Dolor de cabeza persistente y mareos",
    tratamiento:
      "Ibuprofeno 600 mg cada 8 horas por 5 días. Reposo relativo y buena hidratación.",
  },
  {
    id: "2",
    fecha: "03/11/2025",
    motivoPrincipal: "Erupción cutánea con prurito",
    tratamiento:
      "Loratadina 10 mg una vez al día. Crema de hidrocortisona al 1% en zonas afectadas.",
  },
  {
    id: "3",
    fecha: "20/08/2025",
    motivoPrincipal: "Control y seguimiento de hipertensión",
    tratamiento:
      "Amlodipino 5 mg diario. Se ajusta dosis, dieta baja en sodio y actividad física moderada.",
  },
  {
    id: "4",
    fecha: "05/06/2025",
    motivoPrincipal: "Tos productiva y fiebre de 38.5 °C",
    tratamiento:
      "Amoxicilina 500 mg cada 8 horas por 7 días. Paracetamol 500 mg en caso de fiebre.",
  },
];

export const HistorialConsultas = () => {
  const navigate = useNavigate();

  const handleVerConsulta = (id: string) => {
    navigate("/consulta");
  };

  return (
    <>
      <div className="HistorialConsultasDiv">
        <label className="HistorialTitle">Historial de Consultas</label>
        <SearchConsulta diagnosticos={diagnosticos} />
        <TablaHistorialConsultas
          consultas={consultasMock}
          onVerConsulta={handleVerConsulta}
        />
      </div>
    </>
  );
};
