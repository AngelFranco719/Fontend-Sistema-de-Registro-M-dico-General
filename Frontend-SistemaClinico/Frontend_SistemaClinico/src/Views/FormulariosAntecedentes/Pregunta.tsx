import { BsFileRuled } from "react-icons/bs";
import type { PreguntaFormularioDTO } from "../../DTOs/FormulariosDTO";

interface propsPregunta {
  pregunta: PreguntaFormularioDTO;
  updateMode?: (
    mode: "Resumen" | "Modulo",
    pregunta?: PreguntaFormularioDTO,
  ) => void;
}

export const Pregunta = ({ pregunta, updateMode }: propsPregunta) => {
  const antecedentes = pregunta.respuestaFormulario.length;

  const onClickButton = () => {
    updateMode?.("Modulo", pregunta);
  };

  return (
    <>
      <div className="divPregunta">
        <label>{pregunta.pregunta}: </label>
        <label
          className="CantidadRegistrosLabel"
          style={{ color: antecedentes === 0 ? "#828282" : "#202020" }}
        >
          {antecedentes === 0
            ? "Sin antecedentes"
            : `${antecedentes} ${antecedentes === 1 ? " antecedente " : "antecedentes"} Registrados`}
        </label>

        <button className={`ExpandirButton`} onClick={onClickButton}>
          {antecedentes === 0 ? "Agregar" : "Ver / Editar"}
          <BsFileRuled />
        </button>
      </div>
    </>
  );
};
