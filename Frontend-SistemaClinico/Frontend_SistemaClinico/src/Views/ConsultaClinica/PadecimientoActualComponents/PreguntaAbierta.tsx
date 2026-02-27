import "./PreguntasStyles.css";

interface PreguntaAbiertaProps {
  pregunta: string;
  value?: string;
  onChange?: (val: string) => void;
}

export const PreguntaAbierta = ({ pregunta, value, onChange }: PreguntaAbiertaProps) => {
  return (
    <div className="preguntaAbierta">
      <label>{pregunta}</label>

      <input
        type="text"
        placeholder="Inserta la respuesta"
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};
