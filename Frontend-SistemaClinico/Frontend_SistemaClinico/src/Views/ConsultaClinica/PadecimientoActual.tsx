import "./PadecimientoActual.css";
import { PreguntaAbierta } from "./PadecimientoActualComponents/PreguntaAbierta";
import { PreguntaMultipleAbierta } from "./PadecimientoActualComponents/PreguntaMultipleAbierta";
import { PreguntaSiNo } from "./PadecimientoActualComponents/PreguntaSiNo";
import { PreguntaSintomas } from "./PadecimientoActualComponents/PreguntaSintomas";
import type { PadecimientoActualStateDTO } from "../../DTOs/ConsultaClinicaDTO";

type PreguntaRecord =
  | "Multiples Abierta"
  | "Multiples Opcion"
  | "Sintomas"
  | "Abierta"
  | "Opciones"
  | "Si/No";

interface preguntaProps {
  pregunta: string;
  tipo: PreguntaRecord;
  value?: any;
  onChange?: (val: any) => void;
}

const Pregunta = ({ pregunta, tipo, value, onChange }: preguntaProps) => {
  switch (tipo) {
    case "Abierta":
      return <PreguntaAbierta pregunta={pregunta} value={value} onChange={onChange} />;

    case "Multiples Abierta":
      return <PreguntaMultipleAbierta pregunta={pregunta} />;

    case "Sintomas":
      return <PreguntaSintomas pregunta={pregunta} value={value} onChange={onChange} />;
    case "Si/No":
      return <PreguntaSiNo pregunta={pregunta} value={value} onChange={onChange} />;
    default:
      return <></>;
  }
};

interface PadecimientoActualProps {
  state: PadecimientoActualStateDTO;
  onChange: (newState: PadecimientoActualStateDTO) => void;
}

export const PadecimientoActual = ({ state, onChange }: PadecimientoActualProps) => {
  return (
    <div className="padecimientoActualDiv">
      <label className="labelTitulo">Padecimientos y Síntomas</label>

      <div className="divPreguntas">
        <div className="columna-formulario">
          <Pregunta
            pregunta="Motivo Principal de la Consulta"
            tipo="Abierta"
            value={state.motivoConsulta}
            onChange={(val) => onChange({ ...state, motivoConsulta: val })}
          />
          <Pregunta
            pregunta="¿Hace cuánto inició el síntoma principal?"
            tipo="Abierta"
            value={state.tiempoInicio}
            onChange={(val) => onChange({ ...state, tiempoInicio: val })}
          />
          <Pregunta
            pregunta="¿Existe un desencadenante conocido para el síntoma principal?"
            tipo="Si/No"
            value={state.desencadenante}
            onChange={(val) => onChange({ ...state, desencadenante: val })}
          />
        </div>

        <div className="columna-formulario">
          <Pregunta
            pregunta="Principales Síntomas Acompañantes"
            tipo="Sintomas"
            value={state.sintomas}
            onChange={(val) => onChange({ ...state, sintomas: val })}
          />
        </div>
      </div>
    </div>
  );
};
