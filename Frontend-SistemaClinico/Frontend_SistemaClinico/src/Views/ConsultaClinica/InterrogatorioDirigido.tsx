import { useEffect } from "react";
import type {
  GetFormularioDTO,
  PreguntaFormularioDTO,
} from "../../DTOs/FormulariosDTO";
import { CuestionarioAntecedentes } from "../FormulariosAntecedentes/CuestionarioAntecedentes";
import "./InterrogatorioDirigido.css";
import type { respuestaPreguntaInterrogatorio } from "./InterrogatorioDirigido/PreguntaInterrogatorio";
import { produce } from "immer";

const formulario: GetFormularioDTO = {
  id: 1,
  titulo: "Interrogatorio Dirigido",
  descripcion: "Formulario de Interrogatorio Dirigido por aparatos y sistemas",
  categoria: "Clinico",
  subformularios: [
    {
      id: 1,
      titulo: "Síntomas Generales",
      preguntas: [
        {
          id: 101,
          pregunta: "¿El paciente tiene fiebre?",
          orden: 1,
          respuestaFormulario: [],
        },
        {
          id: 102,
          pregunta: "¿Ha presentado pérdida de peso?",
          orden: 2,
          respuestaFormulario: [],
        },
        {
          id: 103,
          pregunta: "¿Presenta fatiga o debilidad?",
          orden: 3,
          respuestaFormulario: [],
        },
        {
          id: 104,
          pregunta: "¿Sudoración nocturna?",
          orden: 4,
          respuestaFormulario: [],
        },
      ],
    },

    {
      id: 2,
      titulo: "Respiratorio",
      preguntas: [
        {
          id: 201,
          pregunta: "¿Presenta tos?",
          orden: 1,
          respuestaFormulario: [],
        },
        {
          id: 202,
          pregunta: "¿Disnea (falta de aire)?",
          orden: 2,
          respuestaFormulario: [],
        },
        {
          id: 203,
          pregunta: "¿Expectoración?",
          orden: 3,
          respuestaFormulario: [],
        },
        {
          id: 204,
          pregunta: "¿Hemoptisis?",
          orden: 4,
          respuestaFormulario: [],
        },
      ],
    },

    {
      id: 3,
      titulo: "Cardiovascular",
      preguntas: [
        {
          id: 301,
          pregunta: "¿Dolor torácico?",
          orden: 1,
          respuestaFormulario: [],
        },
        {
          id: 302,
          pregunta: "¿Palpitaciones?",
          orden: 2,
          respuestaFormulario: [],
        },
        {
          id: 303,
          pregunta: "¿Edema en extremidades inferiores?",
          orden: 3,
          respuestaFormulario: [],
        },
        {
          id: 304,
          pregunta: "¿Síncope o presíncope?",
          orden: 4,
          respuestaFormulario: [],
        },
      ],
    },

    {
      id: 4,
      titulo: "Digestivo",
      preguntas: [
        {
          id: 401,
          pregunta: "¿Náusea o vómito?",
          orden: 1,
          respuestaFormulario: [],
        },
        {
          id: 402,
          pregunta: "¿Dolor abdominal?",
          orden: 2,
          respuestaFormulario: [],
        },
        {
          id: 403,
          pregunta: "¿Diarrea o estreñimiento?",
          orden: 3,
          respuestaFormulario: [],
        },
        {
          id: 404,
          pregunta: "¿Sangrado digestivo?",
          orden: 4,
          respuestaFormulario: [],
        },
        {
          id: 405,
          pregunta: "¿Ictericia?",
          orden: 5,
          respuestaFormulario: [],
        },
      ],
    },

    {
      id: 5,
      titulo: "Genitourinario",
      preguntas: [
        {
          id: 501,
          pregunta: "¿Disuria?",
          orden: 1,
          respuestaFormulario: [],
        },
        {
          id: 502,
          pregunta: "¿Polaquiuria?",
          orden: 2,
          respuestaFormulario: [],
        },
        {
          id: 503,
          pregunta: "¿Hematuria?",
          orden: 3,
          respuestaFormulario: [],
        },
        {
          id: 504,
          pregunta: "¿Incontinencia urinaria?",
          orden: 4,
          respuestaFormulario: [],
        },
      ],
    },

    {
      id: 6,
      titulo: "Neurológico",
      preguntas: [
        {
          id: 601,
          pregunta: "¿Cefalea?",
          orden: 1,
          respuestaFormulario: [],
        },
        {
          id: 602,
          pregunta: "¿Mareo o vértigo?",
          orden: 2,
          respuestaFormulario: [],
        },
        {
          id: 603,
          pregunta: "¿Convulsiones?",
          orden: 3,
          respuestaFormulario: [],
        },
        {
          id: 604,
          pregunta: "¿Déficit motor o sensitivo?",
          orden: 4,
          respuestaFormulario: [],
        },
      ],
    },

    {
      id: 7,
      titulo: "Músculo-esquelético",
      preguntas: [
        {
          id: 701,
          pregunta: "¿Dolor articular?",
          orden: 1,
          respuestaFormulario: [],
        },
        {
          id: 702,
          pregunta: "¿Rigidez matutina?",
          orden: 2,
          respuestaFormulario: [],
        },
        {
          id: 703,
          pregunta: "¿Inflamación articular?",
          orden: 3,
          respuestaFormulario: [],
        },
        {
          id: 704,
          pregunta: "¿Limitación del movimiento?",
          orden: 4,
          respuestaFormulario: [],
        },
      ],
    },

    {
      id: 8,
      titulo: "Endocrino / Metabólico",
      preguntas: [
        {
          id: 801,
          pregunta: "¿Poliuria?",
          orden: 1,
          respuestaFormulario: [],
        },
        {
          id: 802,
          pregunta: "¿Polidipsia?",
          orden: 2,
          respuestaFormulario: [],
        },
        {
          id: 803,
          pregunta: "¿Intolerancia al frío o calor?",
          orden: 3,
          respuestaFormulario: [],
        },
        {
          id: 804,
          pregunta: "¿Cambios en piel o cabello?",
          orden: 4,
          respuestaFormulario: [],
        },
      ],
    },

    {
      id: 9,
      titulo: "Psiquiátrico",
      preguntas: [
        {
          id: 901,
          pregunta: "¿Ansiedad?",
          orden: 1,
          respuestaFormulario: [],
        },
        {
          id: 902,
          pregunta: "¿Estado de ánimo deprimido?",
          orden: 2,
          respuestaFormulario: [],
        },
        {
          id: 903,
          pregunta: "¿Trastornos del sueño?",
          orden: 3,
          respuestaFormulario: [],
        },
      ],
    },

    {
      id: 10,
      titulo: "Hematológico",
      preguntas: [
        {
          id: 1001,
          pregunta: "¿Sangrados anormales?",
          orden: 1,
          respuestaFormulario: [],
        },
        {
          id: 1002,
          pregunta: "¿Moretones frecuentes?",
          orden: 2,
          respuestaFormulario: [],
        },
        {
          id: 1003,
          pregunta: "¿Adenopatías?",
          orden: 3,
          respuestaFormulario: [],
        },
      ],
    },
  ],
};

interface InterrogatorioDirigidoProps {
  state: GetFormularioDTO | null;
  onChange: (newState: GetFormularioDTO) => void;
}

export const InterrogatorioDirigido = ({ state, onChange }: InterrogatorioDirigidoProps) => {
  // Use the global state if provided, otherwise default to the imported structure
  const currentFormulario = state || formulario;

  const onChangeQuestionResponse = (value: respuestaPreguntaInterrogatorio) => {
    const nextState = produce(currentFormulario, (draft) => {
      var pregunta: PreguntaFormularioDTO | undefined = draft.subformularios
        .find((sub) => sub.id === value.categoriaId)
        ?.preguntas.find((pre) => pre.id === value.preguntaId);

      if (pregunta)
        pregunta.respuestaFormulario = !value.respuesta
          ? []
          : [
            {
              respuesta: `Sí. ${value.observaciones ? value.observaciones : ""}`,
              fecha: new Date().toISOString(),
            },
          ];
    });
    onChange(nextState);
  };

  useEffect(() => {
    console.log(
      currentFormulario.subformularios.filter((form) =>
        form.preguntas.some((que) => que.respuestaFormulario.length > 0),
      ),
    );
  }, [currentFormulario]);

  return (
    <>
      <div className="interrogatorioDiv">
        <CuestionarioAntecedentes
          formulario={currentFormulario}
          type="Interrogatorio"
          updateInformation={onChangeQuestionResponse}
        />
      </div>
    </>
  );
};
