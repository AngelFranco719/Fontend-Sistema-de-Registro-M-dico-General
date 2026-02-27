import { BsCaretRightFill } from "react-icons/bs";
import { useState } from "react";
import { PreguntasForm } from "./PreguntasForms";
import "../ConsultaClinica/InterrogatorioDirigido.css";
import type {
  PreguntaFormularioDTO,
  SubformulariosDTO,
} from "../../DTOs/FormulariosDTO";

interface categoriaVisualizerProps {
  categoria: SubformulariosDTO;
  type: "Antecedentes" | "Interrogatorio" | "Exploracion";
  updateInformation?: (payload: any) => void;
  updateMode?: (
    mode: "Resumen" | "Modulo",
    pregunta?: PreguntaFormularioDTO,
  ) => void;
}

export const CategoriaVisualizer = ({
  categoria,
  type,
  updateInformation,
  updateMode,
}: categoriaVisualizerProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const numAntecedentes = categoria.preguntas.filter(
    (pre) => pre.respuestaFormulario.length > 0,
  ).length;

  const handleExpandButton = () => {
    isExpanded ? setIsExpanded(false) : setIsExpanded(true);
  };

  return (
    <>
      <div className={`ExternalDiv ${isExpanded ? "expanded" : ""}`}>
        <div
          className={
            type === "Antecedentes"
              ? "CategoriaVisualizer"
              : "CategoriaVisualizerInterrogatorio"
          }
        >
          <label className="LabelTitulo">{categoria.titulo}</label>
          <label className="LabelAntecedentes">
            {numAntecedentes == 0
              ? "Sin registros"
              : `${numAntecedentes} ${type === "Antecedentes" ? "antecedentes" : "sucesos"} registrados`}
          </label>
          <button className="expand" onClick={() => handleExpandButton()}>
            {
              <>
                <BsCaretRightFill></BsCaretRightFill>
              </>
            }
          </button>
        </div>
        <PreguntasForm
          expanded={isExpanded}
          preguntas={categoria.preguntas}
          type={type}
          updateInformation={updateInformation}
          categoriaId={categoria.id}
          updateMode={updateMode}
        />
      </div>
    </>
  );
};
