import type { SetStateAction } from "react";
import "./ConfirmarAntecedente.css";

interface ConfirmarAntecedenteProps {
  setConfirmActive: React.Dispatch<SetStateAction<boolean>>;
  setConfirmed: React.Dispatch<SetStateAction<boolean>>;
}

export const ConfirmarAntecedente = ({
  setConfirmActive,
  setConfirmed,
}: ConfirmarAntecedenteProps) => {
  const onClickAceptar = () => {
    setConfirmed(true);
    setConfirmActive(false);
  };
  const onClickCancelar = () => {
    setConfirmActive(false);
  };

  return (
    <>
      <div className="divConfirmarAntecedente">
        <label>
          ¿Está seguro de que desea guardar el antecedente en el
          expediente?{" "}
        </label>
        <div className="divOptions">
          <button onClick={onClickAceptar}>Aceptar</button>
          <button onClick={onClickCancelar} className="NoOption">
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};
