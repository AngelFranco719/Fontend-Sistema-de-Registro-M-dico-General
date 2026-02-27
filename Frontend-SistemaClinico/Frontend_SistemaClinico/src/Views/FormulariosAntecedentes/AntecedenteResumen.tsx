import type { SubformulariosDTO } from "../../DTOs/FormulariosDTO";
import "./CuestionarioAntecedentesHeredoFamiliares.css";

interface AntecedentesResumenProps {
  categoria: SubformulariosDTO;
}

export const AntecedenteResumen = ({ categoria }: AntecedentesResumenProps) => {
  return (
    <>
      <div className="ResumensDiv">
        <label>Antecedentes {categoria.titulo}: </label>

        {categoria.preguntas.map((pregunta) => {
          return pregunta.respuestaFormulario.length > 0 ? (
            <>
              <div className="PreguntaCompletaDiv" key={pregunta.id}>
                <label>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {pregunta.pregunta}:
                  </span>{" "}
                </label>

                <div className="Antecedentes">
                  {pregunta.respuestaFormulario.map((respuesta) => {
                    return (
                      <>
                        <div className="AntecedenteResumen">
                          <label>
                            <span
                              style={{
                                fontWeight: "bold",
                                fontSize: "0.9em",
                              }}
                            >
                              {respuesta.fecha}
                            </span>
                            : {respuesta.respuesta}
                          </label>
                        </div>
                      </>
                    );
                  })}
                </div>
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
