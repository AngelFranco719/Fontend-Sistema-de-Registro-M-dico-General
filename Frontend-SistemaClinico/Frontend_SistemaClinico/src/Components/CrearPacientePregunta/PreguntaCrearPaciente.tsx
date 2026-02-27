import { type SetStateAction } from "react";
import type { PacienteResponseType } from "../../Views/RegistrarPaciente/RegistrarPaciente";
import "./PreguntaCrearPaciente.css";

export interface PropsPreguntaCrearPaciente {
  form: string;
  isMandatory: boolean;
  type: PacienteResponseType;
  setValue: React.Dispatch<SetStateAction<string>>;
  value: string;
}

export const PreguntaCrearPaciente = (props: PropsPreguntaCrearPaciente) => {
  const onChangeEvent = (evento: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(evento.target.value);
  };

  const sexOptions = (
    <>
      <div className="HMForm" style={{}}>
        <span>
          <label>Hombre</label>
          <input
            type="radio"
            id="hombre"
            name="sexo"
            value="hombre"
            style={{
              accentColor: "#2B61FF",
            }}
            onChange={onChangeEvent}
          />
        </span>
        <span>
          <label>Mujer</label>
          <input
            style={{
              accentColor: "#2B61FF",
            }}
            type="radio"
            id="mujer"
            name="sexo"
            value="mujer"
            onChange={onChangeEvent}
          />
        </span>
      </div>
    </>
  );

  const renderFormType = (type: PacienteResponseType) => {
    switch (type) {
      case "string":
        return <input type="text" onChange={onChangeEvent}></input>;
      case "h/m":
        return sexOptions;
      case "date":
        return (
          <>
            <input type="date" onChange={onChangeEvent}></input>
          </>
        );
    }
  };

  return (
    <>
      <div className="Form">
        <span className="SpanForm">
          {props.form}
          <label style={{ color: "#9E0000", fontSize: "20px" }}>
            {props.isMandatory && !props.value ? "    *" : ""}
          </label>
          {":"}
        </span>
        {renderFormType(props.type)}
      </div>
    </>
  );
};
