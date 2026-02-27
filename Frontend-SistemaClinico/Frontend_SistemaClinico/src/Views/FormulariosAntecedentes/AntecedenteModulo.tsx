import { BsCardHeading } from "react-icons/bs";
import "./CuestionarioAntecedentesHeredoFamiliares.css";

interface propsAntecedente {
  fecha: string;
  respuesta: string;
}

export const AntecedenteModulo = (props: propsAntecedente) => {
  return (
    <>
      <div className="AntecedenteDiv">
        <label className="FechaLabel">
          <span className="spanTituloAntecedente">
            {" "}
            <BsCardHeading />
            {props.fecha}
          </span>
        </label>

        <label className="RespuestaLabel">{props.respuesta}</label>
      </div>
    </>
  );
};
