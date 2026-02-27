import { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import "./PreguntasStyles.css";

interface PreguntaMultipleAbiertaProps {
  pregunta: string;
}

export const PreguntaMultipleAbierta = ({
  pregunta,
}: PreguntaMultipleAbiertaProps) => {
  const [answers, setAnswers] = useState<string[]>([""]);

  const handleAddClick = () => {
    setAnswers([...answers, ""]);
  };

  const handleChangeAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleDeleteOnClick = (index: number) => {
    const newAnswers = [...answers];
    newAnswers.splice(index, 1);
    setAnswers(newAnswers);
  };

  return (
    <div className="preguntaDiv">
      <div className="preguntaHeader">
        <label>{pregunta}</label>

        <button
          type="button"
          className="btnAddRespuesta"
          onClick={handleAddClick}
        >
          <IoAddCircle />
        </button>
      </div>

      <div className="respuestasContainer">
        {answers.map((answer, index) => (
          <div key={index} className="respuestaRow">
            <input
              type="text"
              placeholder="Inserta la respuesta"
              value={answer}
              onChange={(e) => handleChangeAnswer(index, e.target.value)}
            />

            <button
              type="button"
              className="btnDeleteRespuesta"
              onClick={() => handleDeleteOnClick(index)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
