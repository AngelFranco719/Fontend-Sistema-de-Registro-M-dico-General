import { useParams } from "react-router-dom";
import { usePaciente } from "../../context/PacienteContext";
import { CuestionarioAntecedentes } from "../FormulariosAntecedentes/CuestionarioAntecedentes";
import { useCurrentFormulario } from "../../context/CurrentFormularioContext";
import { useEffect } from "react";
import { current } from "immer";

export const AntecedentesView = () => {
  const { historiaClinica } = usePaciente();

  const { currentFormulario, setCurrentFormulario } = useCurrentFormulario();

  const { nombreFormulario } = useParams<{ nombreFormulario: string }>();

  useEffect(() => {
    console.log(currentFormulario);
  }, [currentFormulario]);

  useEffect(() => {
    if (historiaClinica) {
      switch (nombreFormulario) {
        case "AntecedentesHeredofamiliares":
          setCurrentFormulario(historiaClinica.antecedentesHeredofamiliares);
          break;
        case "AntecedentesNoPatologicos":
          setCurrentFormulario(historiaClinica.antecedentesNoPatologicos);
          break;
        case "AntecedentesPatologicos":
          setCurrentFormulario(historiaClinica.antecedentesPatologicos);
          break;
      }
    }
  }, [nombreFormulario, historiaClinica, setCurrentFormulario]);

  return (
    currentFormulario && (
      <>
        <CuestionarioAntecedentes
          formulario={currentFormulario}
          type="Antecedentes"
        />
      </>
    )
  );
};
