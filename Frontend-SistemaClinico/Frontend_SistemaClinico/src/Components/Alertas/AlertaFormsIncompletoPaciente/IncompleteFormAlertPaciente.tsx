import { type SetStateAction } from "react";
import type React from "react";
import { createPortal } from "react-dom";
import "./IncompleteFormAlertPaciente.css";

export interface alertIncompletePaciente {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  faltantes: string[];
}

export const IncompleteFormAlertPaciente = (props: alertIncompletePaciente) => {
  if (!props.open) return null;

  const onClickAcceptHandler = () => {
    props.setOpen(false);
  };

  return createPortal(
    <>
      <div className="alertFormPacienteMissing">
        <div className="alert">
          <label className="title">ALERTA</label>
          <label className="description">
            Se deben rellenar todos los campos obligatorios. Los campos
            faltantes son los siguientes:
          </label>
          {props.faltantes.map((falta) => {
            return (
              <>
                <label>{falta}</label>
              </>
            );
          })}
          <button className="exitButton" onClick={onClickAcceptHandler}>
            Aceptar
          </button>
        </div>
      </div>
    </>,
    document.body,
  );
};
