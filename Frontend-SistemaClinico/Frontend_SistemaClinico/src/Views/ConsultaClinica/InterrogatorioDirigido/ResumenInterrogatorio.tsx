import type { SubformulariosDTO } from "../../../DTOs/FormulariosDTO";
import "../../FormulariosAntecedentes/CuestionarioAntecedentesHeredoFamiliares.css";
import "../InterrogatorioDirigido.css";

interface ResumenInterrogatorioProps {
  categoria: SubformulariosDTO;
}

export const ResumenInterrogatorio = ({
  categoria,
}: ResumenInterrogatorioProps) => {
  return (
    <>
      <div className="ResumensDiv">
        <label>{categoria.titulo}: </label>

        {categoria.preguntas.map((pregunta) => {
          return pregunta.respuestas.length > 0 ? (
            <>
              <div className="PreguntaCompletaDiv" key={pregunta.id}>
                <label>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {pregunta.pregunta}
                  </span>{" "}
                  {pregunta.respuestas[0].respuesta}
                </label>
              </div>
            </>
          ) : (
            <></>
          );
        })}
      </div>
    </>
  );
};
