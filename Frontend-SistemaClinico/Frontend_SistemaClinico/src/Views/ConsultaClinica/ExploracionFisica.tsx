
import type {
    GetFormularioDTO,
    PreguntaFormularioDTO,
} from "../../DTOs/FormulariosDTO";
import { CuestionarioAntecedentes } from "../FormulariosAntecedentes/CuestionarioAntecedentes";
import type { respuestaPreguntaInterrogatorio } from "./InterrogatorioDirigido/PreguntaInterrogatorio";
import { produce } from "immer";
import "./ExploracionFisica.css";

const formularioExploracionFisica: GetFormularioDTO = {
    id: 2,
    titulo: "Exploración Física",
    descripcion: "Exploración Física según los lineamientos de la NOM-004-SSA3-2012 para el expediente clínico.",
    categoria: "Clinico",
    subformularios: [
        {
            id: 11,
            titulo: "Signos Vitales y Aspecto General",
            preguntas: [
                { id: 1101, pregunta: "Estado de alerta y orientación (Consciencia)", orden: 1, respuestaFormulario: [] },
                { id: 1102, pregunta: "Constitución y estado nutricional aparente", orden: 2, respuestaFormulario: [] },
                { id: 1103, pregunta: "Facies (Expresión facial)", orden: 3, respuestaFormulario: [] },
                { id: 1104, pregunta: "Signos Vitales (TA, FC, FR, Temp)", orden: 4, respuestaFormulario: [] }
            ]
        },
        {
            id: 12,
            titulo: "Cabeza y Cuello",
            preguntas: [
                { id: 1201, pregunta: "Cráneo (forma, volumen, exostosis, hundimientos)", orden: 1, respuestaFormulario: [] },
                { id: 1202, pregunta: "Ojos y anexos (pupilas, escleróticas, conjuntivas)", orden: 2, respuestaFormulario: [] },
                { id: 1203, pregunta: "Nariz y senos paranasales", orden: 3, respuestaFormulario: [] },
                { id: 1204, pregunta: "Cavidad oral (mucosas, dentadura, faringe)", orden: 4, respuestaFormulario: [] },
                { id: 1205, pregunta: "Cuello (movilidad, tiroides, pulsos, ganglios)", orden: 5, respuestaFormulario: [] }
            ]
        },
        {
            id: 13,
            titulo: "Tórax",
            preguntas: [
                { id: 1301, pregunta: "Inspección (forma, volumen, movimientos respiratorios)", orden: 1, respuestaFormulario: [] },
                { id: 1302, pregunta: "Palpación (amplexión, amplexación, frémito)", orden: 2, respuestaFormulario: [] },
                { id: 1303, pregunta: "Percusión (claro pulmonar, matidez)", orden: 3, respuestaFormulario: [] },
                { id: 1304, pregunta: "Auscultación pulmonar (murmullo vesicular, estertores)", orden: 4, respuestaFormulario: [] },
                { id: 1305, pregunta: "Auscultación cardiaca (focos, ruidos, soplos)", orden: 5, respuestaFormulario: [] }
            ]
        },
        {
            id: 14,
            titulo: "Abdomen",
            preguntas: [
                { id: 1401, pregunta: "Inspección (forma, volumen, red venosa colateral)", orden: 1, respuestaFormulario: [] },
                { id: 1402, pregunta: "Auscultación (peristalsis)", orden: 2, respuestaFormulario: [] },
                { id: 1403, pregunta: "Palpación superficial and profunda (dolor, masas, visceromegalias)", orden: 3, respuestaFormulario: [] },
                { id: 1404, pregunta: "Percusión (timpanismo, matidez)", orden: 4, respuestaFormulario: [] },
            ]
        },
        {
            id: 15,
            titulo: "Extremidades",
            preguntas: [
                { id: 1501, pregunta: "Simetría, trofismo y tono muscular", orden: 1, respuestaFormulario: [] },
                { id: 1502, pregunta: "Articulaciones (arcos de movilidad, inflamación)", orden: 2, respuestaFormulario: [] },
                { id: 1503, pregunta: "Pulsos periféricos y llenado capilar", orden: 3, respuestaFormulario: [] },
                { id: 1504, pregunta: "Reflejos osteotendinosos", orden: 4, respuestaFormulario: [] }
            ]
        },
        {
            id: 16,
            titulo: "Genitales y Tactos (Si aplica)",
            preguntas: [
                { id: 1601, pregunta: "Exploración genital (inspección / tactos especiales)", orden: 1, respuestaFormulario: [] }
            ]
        }
    ]
};

interface ExploracionFisicaProps {
    state: GetFormularioDTO | null;
    onChange: (newState: GetFormularioDTO) => void;
}

export const ExploracionFisica = ({ state, onChange }: ExploracionFisicaProps) => {
    const currentFormulario = state || formularioExploracionFisica;

    const onChangeQuestionResponse = (value: respuestaPreguntaInterrogatorio) => {
        const nextState = produce(currentFormulario, (draft) => {
            var pregunta: PreguntaFormularioDTO | undefined = draft.subformularios
                .find((sub) => sub.id === value.categoriaId)
                ?.preguntas.find((pre) => pre.id === value.preguntaId);

            if (pregunta) {
                if (!value.respuesta || !value.observaciones?.trim()) {
                    pregunta.respuestaFormulario = [];
                } else {
                    pregunta.respuestaFormulario = [
                        {
                            respuesta: `Hallazgo: ${value.observaciones}`,
                            fecha: new Date().toISOString(),
                        },
                    ];
                }
            }
        });
        onChange(nextState);
    };

    return (
        <div className="exploracionFisicaContainer">
            <CuestionarioAntecedentes
                formulario={currentFormulario}
                type="Exploracion"
                updateInformation={onChangeQuestionResponse}
            />
        </div>
    );
};
