import type { PreguntaFormularioDTO } from "../../../DTOs/FormulariosDTO";
import "../../FormulariosAntecedentes/CuestionarioAntecedentesHeredoFamiliares.css";
import { useEffect, useState } from "react";
import type { respuestaPreguntaInterrogatorio } from "../InterrogatorioDirigido/PreguntaInterrogatorio";

interface propsPregunta {
    pregunta: PreguntaFormularioDTO;
    categoriaId: number;
    updateInformation?: (payload: any) => void;
}

export const PreguntaExploracion = ({
    pregunta,
    categoriaId,
    updateInformation,
}: propsPregunta) => {
    const isAnswered = pregunta.respuestas.length > 0;
    const initialObs = isAnswered
        ? pregunta.respuestas[0].respuesta.replace(/^Hallazgo: /, "")
        : "";

    const [observaciones, setObservaciones] = useState<string>(initialObs);

    useEffect(() => {
        const timer = setTimeout(() => {
            const hasAnswer = observaciones.trim().length > 0;
            // Only fire update if the internal state is different from what we would have initialized with.
            // This prevents an infinite loop or immediate overriding on mount.
            const currentObs = pregunta.respuestas.length > 0
                ? pregunta.respuestas[0].respuesta.replace(/^Hallazgo: /, "")
                : "";

            if (observaciones !== currentObs) {
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
    }, [observaciones, pregunta.id, categoriaId, updateInformation, pregunta.respuestas]);

    return (
        <>
            <div className="divPreguntaInterrogatorio" style={{ flexDirection: "column", alignItems: "flex-start" }}>
                <label style={{ marginBottom: "5px" }}>{pregunta.pregunta}</label>
                <div
                    className="opcionesDiv"
                    style={{
                        marginLeft: "20px",
                        width: "calc(100% - 20px)",
                    }}
                >
                    <input
                        type="text"
                        placeholder="Registrar hallazgos..."
                        className="inputPregunta"
                        style={{
                            fontSize: "0.8rem",
                            width: "100%",
                            padding: "8px",
                            boxSizing: "border-box"
                        }}
                        value={observaciones}
                        onChange={(e) => {
                            setObservaciones(e.target.value);
                        }}
                    />
                </div>
            </div>
        </>
    );
};
