import { createPortal } from "react-dom";
import "../Alertas.css";
import type { SetStateAction } from "react";

interface propsAlerta {
  titulo: string;
  setActive: React.Dispatch<SetStateAction<boolean>>;
}
export const AlertaConfirmarFormulario = ({
  titulo,
  setActive,
}: propsAlerta) => {
  return createPortal(
    <>
      <div className="overlayAlerta">
        <div className="divPrincipalAlerta">
          <label>
            ¿Esta seguro que quiere guardar los{" "}
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              {titulo}
            </span>{" "}
            en el expediente del paciente x?
          </label>
          <div className="divConfirmButtons">
            <button className="btn-confirm-save">Guardar</button>
            <button
              className="btn-confirm-cancel"
              onClick={() => {
                setActive(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};
