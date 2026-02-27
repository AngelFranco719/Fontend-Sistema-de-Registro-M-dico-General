import { IoAddCircle } from "react-icons/io5";
import "./PreguntasStyles.css";
import { useEffect, useRef } from "react";

import type { SintomaDTO } from "../../../DTOs/ConsultaClinicaDTO";

interface PreguntaSintomasProps {
  pregunta: string;
  value?: SintomaDTO[];
  onChange?: (val: SintomaDTO[]) => void;
}



export const PreguntaSintomas = ({ pregunta, value, onChange }: PreguntaSintomasProps) => {
  const sintomas = value || [];

  const refPrincipalDiv = useRef<HTMLDivElement>(null);

  const handleAddClick = () => {
    const actual = [...sintomas];
    actual.push({
      descripcion: "",
      severidad: "",
      agravantes: "",
    });
    onChange?.(actual);
  };

  useEffect(() => {
    refPrincipalDiv.current?.scrollTo({
      top: refPrincipalDiv.current?.scrollHeight || 0,
      behavior: "smooth",
    });
  }, [sintomas.length]);

  const handleSeveridadOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNaN(Number(value))) e.target.className = "inputPregunta inputError";
    else e.target.className = "inputPregunta";
  };

  return (
    <div
      className="preguntaDiv"
      ref={refPrincipalDiv}
      style={{
        maxHeight: "380px",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div className="preguntaHeader">
        <label>{pregunta}</label>
        <button
          type="button"
          className="btnAddRespuesta"
          onClick={handleAddClick}
          title="Agregar Síntoma"
        >
          <IoAddCircle />
        </button>
      </div>

      <div className="respuestasContainer">
        {sintomas.map((sintoma, index) => (
          <div
            className="respuestaRow"
            key={index}
            style={{
              flexDirection: "column",
              alignItems: "stretch",
              paddingBottom: "16px",
              borderBottom: index !== sintomas.length - 1 ? "1px solid #e2e8f0" : "none",
            }}
          >
            <label
              style={{
                fontSize: "0.75rem",
                fontWeight: "700",
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Síntoma {index + 1}
            </label>

            <input
              className="inputPregunta"
              placeholder="Descripción del Síntoma (Ej. Tos seca)"
              value={sintoma.descripcion}
              onChange={(e) => {
                const newSintomas = [...sintomas];
                newSintomas[index].descripcion = e.target.value;
                onChange?.(newSintomas);
              }}
            />

            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <input
                className="inputPregunta"
                style={{ flex: "0 0 120px" }}
                placeholder="Severidad (1-10)"
                value={sintoma.severidad?.toString() || ""}
                onChange={(e) => {
                  handleSeveridadOnChange(e);
                  const newSintomas = [...sintomas];
                  newSintomas[index].severidad = e.target.value;
                  onChange?.(newSintomas);
                }}
              />
              <input
                className="inputPregunta"
                style={{ flex: 1 }}
                placeholder="Características (Periodicidad, Agravantes...)"
                value={sintoma.agravantes}
                onChange={(e) => {
                  const newSintomas = [...sintomas];
                  newSintomas[index].agravantes = e.target.value;
                  onChange?.(newSintomas);
                }}
              />
              <button
                type="button"
                className="btnDeleteRespuesta"
                onClick={() => {
                  const newSintomas = [...sintomas];
                  newSintomas.splice(index, 1);
                  onChange?.(newSintomas);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
