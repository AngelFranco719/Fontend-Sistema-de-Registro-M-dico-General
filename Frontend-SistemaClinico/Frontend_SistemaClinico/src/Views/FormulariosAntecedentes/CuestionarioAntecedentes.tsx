import { AlertaConfirmarFormulario } from "../../Components/Alertas/AlertaConfirmarFormulario/AlertaConfirmarFormulario";
import type {
  GetFormularioDTO,
  PreguntaFormularioDTO,
} from "../../DTOs/FormulariosDTO";
import { CategoriaVisualizer } from "./CategoriaVisualizer";
import "./CuestionarioAntecedentesHeredoFamiliares.css";
import { FormResumen } from "./FormResumen";
import { useState } from "react";


interface CuestionarioAntecedentesInterface {
  formulario: GetFormularioDTO;
  type: "Antecedentes" | "Interrogatorio" | "Exploracion";
  updateInformation?: (payload: any) => void;
}

export const CuestionarioAntecedentes = ({
  formulario,
  type,
  updateInformation,
}: CuestionarioAntecedentesInterface) => {
  const [save, setSave] = useState<boolean>(false);
  const [visualizerMode, setVisualizerMode] = useState<"Resumen" | "Modulo">(
    "Resumen",
  );
  const [preguntaModulo, setPreguntaModulo] = useState<
    PreguntaFormularioDTO | undefined
  >(undefined);

  const filterCategoriasToResume = () => {
    return formulario.subformularios.filter((sub) =>
      sub.preguntas.some((pre) => pre.respuestaFormulario.length > 0),
    );
  };

  const updateMode = (
    mode: "Resumen" | "Modulo",
    pregunta?: PreguntaFormularioDTO,
  ) => {
    setVisualizerMode(mode);
    pregunta && setPreguntaModulo(pregunta);
  };

  return (
    <>
      <div className="PrincipalDivHeredofamiliares">
        <div
          className="Formulario"
          style={
            type === "Interrogatorio" || type === "Exploracion"
              ? {
                maxHeight: "420px",
              }
              : {}
          }
        >
          {type === "Antecedentes" ? (
            <div className="Header">
              <label className="TituloFormulario">{formulario.titulo}</label>
              {formulario.descripcion && (
                <p className="DescripcionFormulario">{formulario.descripcion}</p>
              )}
            </div>
          ) : (
            <label className="labelTitulo">
              {type === "Exploracion"
                ? "Exploración Física"
                : "Interrogatorio Dirigido"}
            </label>
          )}
          {formulario.subformularios.map((categoria) => {
            return (
              <CategoriaVisualizer
                categoria={categoria}
                type={type}
                updateInformation={updateInformation}
                updateMode={type === "Antecedentes" ? updateMode : undefined}
              />
            );
          })}
        </div>
        <div className="FormResume">
          <FormResumen
            titulo={formulario.titulo}
            modo={visualizerMode}
            infoModulo={preguntaModulo}
            categorias={filterCategoriasToResume()}
            type={type}
            updateMode={updateMode}
          />
        </div>
      </div>
      {save ? (
        <AlertaConfirmarFormulario
          titulo={formulario.titulo}
          setActive={setSave}
        />
      ) : (
        <></>
      )}
    </>
  );
};
