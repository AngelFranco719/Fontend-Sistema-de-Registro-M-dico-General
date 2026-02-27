import type { PreguntaFormularioDTO } from "../../../DTOs/FormulariosDTO";
import "../PadecimientoActualComponents/PreguntasStyles.css";
import "../../FormulariosAntecedentes/CuestionarioAntecedentesHeredoFamiliares.css";
import { useEffect, useState } from "react";

interface propsPregunta {
  pregunta: PreguntaFormularioDTO;
  categoriaId: number;
  updateInformation?: (payload: any) => void;
}

export interface respuestaPreguntaInterrogatorio {
  preguntaId: number;
  categoriaId: number;
  respuesta: boolean;
  observaciones?: string;
}

export const PreguntaInterrogatorio = ({
  pregunta,
  categoriaId,
  updateInformation,
}: propsPregunta) => {
  const isAnswered = pregunta.respuestas.length > 0;
  const initialValue = isAnswered ? pregunta.respuestas[0].respuesta.startsWith("Sí") : false;
  const initialObs = isAnswered && initialValue
    ? pregunta.respuestas[0].respuesta.replace(/^Sí\.\s*/, "")
    : "";

  const [hasAnswer, setHasAnswer] = useState<boolean>(initialValue);
  const [observaciones, setObservaciones] = useState<string>(initialObs);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentAns = pregunta.respuestas.length > 0 ? pregunta.respuestas[0].respuesta.startsWith("Sí") : false;
      const currentObs = pregunta.respuestas.length > 0 && currentAns
        ? pregunta.respuestas[0].respuesta.replace(/^Sí\.\s*/, "")
        : "";

      if (hasAnswer !== currentAns || observaciones !== currentObs) {
        const respuesta: respuestaPreguntaInterrogatorio = {
          preguntaId: pregunta.id,
          categoriaId: categoriaId,
          respuesta: hasAnswer,
          observaciones: observaciones,
        };
        updateInformation?.(respuesta);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [hasAnswer, observaciones, pregunta.id, categoriaId, updateInformation, pregunta.respuestas]);



  return (
    <>
      <div className="divPreguntaInterrogatorio">
        <label>{pregunta.pregunta}</label>
        <div
          className="opcionesDiv"
          style={{
            marginLeft: "20px",
          }}
        >
          <label className="opcionRadio">
            <input
              type="radio"
              name={pregunta.pregunta}
              value="Si"
              checked={hasAnswer}
              onChange={() => {
                setHasAnswer(true);
              }}
            />
            <span
              style={{
                fontWeight: "lighter",
                fontSize: "0.8rem",
              }}
            >
              Si
            </span>
          </label>

          <label className="opcionRadio">
            <input
              type="radio"
              value="No"
              name={pregunta.pregunta}
              checked={!hasAnswer}
              onChange={() => {
                setHasAnswer(false);
              }}
            />
            <span style={{ fontWeight: "lighter", fontSize: "0.8rem" }}>
              No
            </span>
          </label>

          <input
            type="text"
            placeholder="Observaciones adicionales"
            className="inputPregunta"
            disabled={!hasAnswer}
            value={observaciones}
            style={{
              fontSize: "0.8rem",
              width: "100%",
            }}
            onChange={(e) => {
              const nuevo = e.target.value;
              setObservaciones(nuevo);
            }}
          />
        </div>
      </div>
    </>
  );
};
