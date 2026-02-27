import type { SetStateAction } from "react";
import type { CrearPacienteDTO } from "../../../DTOs/PacienteDTOs";
import { createPortal } from "react-dom";
import "./AlertaFormsConfirmarPaciente.css";

export interface propsAlertaFormsConfirmarPaciente {
  paciente: CrearPacienteDTO;
  setActive: React.Dispatch<SetStateAction<boolean>>;
  active: boolean;
  setSavePaciente: React.Dispatch<SetStateAction<boolean>>;
  isPending: boolean;
}

interface information {
  label: string;
  value?: string;
}

export const AlertaFormsConfirmarPaciente = (
  props: propsAlertaFormsConfirmarPaciente,
) => {
  const preview: information[] = [
    { label: "Nombres", value: props.paciente.nombres },
    { label: "Apellidos", value: props.paciente.apellidos },
    { label: "Sexo", value: props.paciente.sexo },
    { label: "Fecha de Nacimiento", value: props.paciente.fechaNacimiento },
    { label: "Telefono", value: props.paciente.telefono },
    {
      label: "Contacto de Emergencia",
      value: props.paciente.contactoEmergencia,
    },
    { label: "CURP", value: props.paciente.curp },
  ];

  const handleEditarClick = () => {
    props.setActive(false);
  };

  return createPortal(
    <>
      <div className="alertaFormConfirmarPaciente">
        <div className="alert">
          {props.isPending ? (
            <>
              <div className="loading-container">
                <div className="spinner"></div>
                <p className="loading-text">
                  Guardando información del paciente...
                </p>
                <span className="subtext">
                  Por favor, no cierres esta ventana.
                </span>
              </div>
            </>
          ) : (
            <>
              <label className="title">Confirmar Formulario</label>
              <label className="description">Vista previa del Paciente: </label>
              {preview.map((element) => {
                return (
                  <label className={element.value ? "information" : "missing"}>
                    <span>{`${element.label}: `}</span>
                    {element.value ? element.value : "No especificado"}
                  </label>
                );
              })}
              <div className="buttons">
                <button
                  className="aceptar"
                  onClick={() => {
                    props.setSavePaciente(true);
                  }}
                >
                  Aceptar
                </button>
                <button className="editar" onClick={handleEditarClick}>
                  Editar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>,
    document.body,
  );
};
