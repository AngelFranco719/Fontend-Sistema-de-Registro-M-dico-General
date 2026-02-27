import type { PreguntaFormularioDTO } from "../../DTOs/FormulariosDTO";
import { PreguntaInterrogatorio } from "../ConsultaClinica/InterrogatorioDirigido/PreguntaInterrogatorio";
import { PreguntaExploracion } from "../ConsultaClinica/ExploracionFisica/PreguntaExploracion";
import "./CuestionarioAntecedentesHeredoFamiliares.css";
import { Pregunta } from "./Pregunta";

interface preguntaVisualizerProps {
  preguntas: PreguntaFormularioDTO[];
  categoriaId: number;
  expanded: boolean;
  type: "Antecedentes" | "Interrogatorio" | "Exploracion";
  updateInformation?: (payload: any) => void;
  updateMode?: (
    mode: "Resumen" | "Modulo",
    pregunta?: PreguntaFormularioDTO,
  ) => void;
}

export const PreguntasForm = ({
  preguntas,
  expanded,
  type,
  updateInformation,
  updateMode,
  categoriaId,
}: preguntaVisualizerProps) => {
  const mapPregunta = (pregunta: PreguntaFormularioDTO) => {
    switch (type) {
      case "Antecedentes":
        return <Pregunta pregunta={pregunta} updateMode={updateMode} />;
      case "Interrogatorio":
        return (
          <PreguntaInterrogatorio
            pregunta={pregunta}
            updateInformation={updateInformation}
            categoriaId={categoriaId}
          />
        );
      case "Exploracion":
        return (
          <PreguntaExploracion
            pregunta={pregunta}
            updateInformation={updateInformation}
            categoriaId={categoriaId}
          />
        );
    }
  };

  return (
    <>
      <div className={`PreguntasForm ${expanded ? "open" : ""}`}>
        {preguntas.map((pregunta) => {
          return mapPregunta(pregunta);
        })}
      </div>
    </>
  );
};
