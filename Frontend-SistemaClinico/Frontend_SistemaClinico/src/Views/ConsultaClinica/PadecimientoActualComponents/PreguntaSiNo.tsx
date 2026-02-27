
import "./PreguntasStyles.css";

interface propsPreguntaSiNo {
  pregunta: string;
  value?: { respuesta: boolean | null; detalles: string };
  onChange?: (val: { respuesta: boolean | null; detalles: string }) => void;
}

export const PreguntaSiNo = ({ pregunta, value, onChange }: propsPreguntaSiNo) => {
  const opcion = value?.respuesta;

  return (
    <div className="preguntaDiv">
      <div className="preguntaHeader">
        <label>{pregunta}</label>
      </div>

      <div className="opcionesDiv">
        <label className="opcionRadio">
          <input
            type="radio"
            name={pregunta}
            value="Si"
            checked={opcion === true}
            onChange={() => onChange?.({ respuesta: true, detalles: value?.detalles || "" })}
          />
          <span>Sí</span>
        </label>

        <label className="opcionRadio">
          <input
            type="radio"
            name={pregunta}
            value="No"
            checked={opcion === false}
            onChange={() => onChange?.({ respuesta: false, detalles: "" })}
          />
          <span>No</span>
        </label>

        {opcion && (
          <input
            className="inputPregunta"
            type="text"
            placeholder="Especifique los detalles..."
            style={{ width: "100%", marginTop: "8px" }}
            value={value?.detalles || ""}
            onChange={(e) => onChange?.({ respuesta: true, detalles: e.target.value })}
          />
        )}
      </div>
    </div>
  );
};
