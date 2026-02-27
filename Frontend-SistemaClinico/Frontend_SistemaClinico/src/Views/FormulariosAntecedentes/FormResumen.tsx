import type {
  PreguntaFormularioDTO,
  SubformulariosDTO,
} from "../../DTOs/FormulariosDTO";
import "./CuestionarioAntecedentesHeredoFamiliares.css";
import "./CrearAntecedentes.css";
import "./ResumenAntecedentes.css";
import { ModuloPregunta } from "./ModuloPregunta";
import { AntecedenteResumen } from "./AntecedenteResumen";
import { ResumenInterrogatorio } from "../ConsultaClinica/InterrogatorioDirigido/ResumenInterrogatorio";
import { PacienteInfoBanner } from "../../Components/PacienteInfoBanner/PacienteInfoBanner";

interface propsResumen {
  titulo: string;
  modo: "Resumen" | "Modulo";
  categorias: SubformulariosDTO[];
  infoModulo?: PreguntaFormularioDTO;
  type: "Antecedentes" | "Interrogatorio" | "Exploracion";
  updateMode: (
    mode: "Resumen" | "Modulo",
    pregunta?: PreguntaFormularioDTO,
  ) => void;
}

export const FormResumen = (props: propsResumen) => {
  const RenderResumen = (categoria: SubformulariosDTO) => {
    switch (props.type) {
      case "Antecedentes":
        return <AntecedenteResumen categoria={categoria} />;
      case "Interrogatorio":
      case "Exploracion":
        return <ResumenInterrogatorio categoria={categoria} />;
    }
  };

  return (
    <>
      {props.modo == "Resumen" ? (
        <>
          <div
            className="FormResume"
            style={
              props.type === "Interrogatorio" || props.type === "Exploracion"
                ? {
                    maxHeight: "380px",
                  }
                : {}
            }
          >
            <label className="tituloModulo ">Resumen de {props.titulo}</label>
            {props.type === "Antecedentes" && <PacienteInfoBanner />}
            <div className="CategoriasDiv">
              {props.categorias.map((categoria) => {
                return RenderResumen(categoria);
              })}
            </div>
          </div>
        </>
      ) : (
        props.infoModulo && (
          <ModuloPregunta
            formTitulo={props.titulo}
            infoModulo={props.infoModulo}
            updateMode={props.updateMode}
          />
        )
      )}
    </>
  );
};
