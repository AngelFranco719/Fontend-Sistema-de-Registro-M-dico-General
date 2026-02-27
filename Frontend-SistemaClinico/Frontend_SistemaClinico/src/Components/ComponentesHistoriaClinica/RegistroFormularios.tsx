import { useNavigate } from "react-router-dom";
import "./RegistroFormularios.css";
export interface EstadoFormularios {
  titulo: string;
  estado: "realizado" | "no realizado" | "parcial";
}

interface propsRegistroFormularios {
  formularios: EstadoFormularios[];
}

export const RegistroFormularios = (props: propsRegistroFormularios) => {
  const getClassNameCard = (formulario: EstadoFormularios) => {
    switch (formulario.estado) {
      case "realizado":
        return "realizadoCard";
      case "no realizado":
        return "noRealizadoCard";
      case "parcial":
        return "parcialCard";
    }
  };

  const getClassNameTag = (formulario: EstadoFormularios) => {
    switch (formulario.estado) {
      case "realizado":
        return "realizadoTag";
      case "no realizado":
        return "noRealizadoTag";
      case "parcial":
        return "parcialTag";
    }
  };

  const getNameFormulario = (title: string) => {
    switch (title) {
      case "Antecedentes Heredofamiliares":
        return "AntecedentesHeredofamiliares";
      case "Antecedentes No Patológicos":
        return "AntecedentesNoPatologicos";
      case "Antecedentes Patológicos":
        return "AntecedentesPatologicos";
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="RegistroFormularios">
        <label>Formularios Registrados</label>
        {props.formularios.map((formulario) => {
          return (
            <>
              <div className={getClassNameCard(formulario)}>
                <label>{formulario.titulo}</label>
                <label className={getClassNameTag(formulario)}>
                  {formulario.estado}
                </label>
                <button
                  className="verFormularioButton"
                  onClick={() => {
                    navigate(
                      `/Antecedentes/${getNameFormulario(formulario.titulo)}`,
                    );
                  }}
                >
                  Ver Formulario
                </button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
