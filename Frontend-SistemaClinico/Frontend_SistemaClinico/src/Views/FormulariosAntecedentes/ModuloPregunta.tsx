import { IoClose } from "react-icons/io5";
import { AntecedenteModulo } from "./AntecedenteModulo";
import type {
  PostRespuestaAntecedentes,
  PreguntaFormularioDTO,
} from "../../DTOs/FormulariosDTO";
import { useEffect, useState } from "react";
import { ConfirmarAntecedente } from "./ConfirmarAntecedente";
import { usePaciente } from "../../context/PacienteContext";
import { usePostAntecedenteResponse } from "../../Hooks/useFormularioAPI";
import { useCurrentFormulario } from "../../context/CurrentFormularioContext";
import { useGetHistoriaClinica } from "../../Hooks/useHistoriaClinica";

interface ModuloPreguntaProps {
  infoModulo: PreguntaFormularioDTO;
  formTitulo: string;
  updateMode: (
    mode: "Resumen" | "Modulo",
    pregunta?: PreguntaFormularioDTO,
  ) => void;
}

export const ModuloPregunta = ({
  infoModulo,
  formTitulo,
  updateMode,
}: ModuloPreguntaProps) => {
  const [confirmActive, setConfirmActive] = useState<boolean>(false);
  var hoy = new Date().toISOString().split("T")[0];
  const [fecha, setFecha] = useState<string>(hoy);
  const [descripcion, setDescripcion] = useState<string>("");

  const onClickGuardarButton = () => {
    setConfirmActive(true);
  };

  const { pacienteActual } = usePaciente();
  const { mutate, isPending } = usePostAntecedenteResponse(
    pacienteActual?.pacienteId ?? 0,
  );
  const { setCurrentFormulario } = useCurrentFormulario();
  const { refetch } = useGetHistoriaClinica(pacienteActual?.pacienteId ?? 0, {
    enabled: pacienteActual != null,
  });

  const { setHistoriaClinica } = usePaciente();

  const updateFormulario = () => {
    if (pacienteActual) {
      const response: PostRespuestaAntecedentes = {
        formularioTitulo: formTitulo,
        pacienteNombre: pacienteActual.nombres,
        pacienteApellido: pacienteActual.apellidos,
        preguntaId: infoModulo.preguntaFormularioId,
        respuesta: descripcion,
        fecha: fecha,
      };
      mutate(response, {
        onSuccess: async (data) => {
          setCurrentFormulario(data);
          const { data: historiaData } = await refetch();
          setConfirmActive(false);
          setHistoriaClinica(historiaData);
          setFecha(hoy);
          setDescripcion("");
        },
      });
    }
  };

  return (
    <>
      <label className="tituloModulo">
        Antecedentes de {infoModulo.pregunta}:{" "}
        <button
          className="closeButton"
          onClick={() => {
            updateMode("Resumen");
          }}
        >
          <IoClose />
        </button>
      </label>
      <div className="CategoriasDiv">
        {infoModulo.respuestaFormulario.map((antecedente) => {
          return (
            <AntecedenteModulo
              fecha={antecedente.fecha}
              respuesta={antecedente.respuesta}
            />
          );
        })}
        <div className="NuevoAntecedenteDiv">
          <label>Agregar Antecedente: </label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => {
              setFecha(e.target.value);
            }}
          />
          <textarea
            value={descripcion}
            onChange={(e) => {
              setDescripcion(e.target.value);
            }}
            placeholder="Agrega la descripción del antecedente"
          ></textarea>
          {confirmActive ? (
            <>
              <ConfirmarAntecedente
                setConfirmActive={setConfirmActive}
                setConfirmed={updateFormulario}
              />
            </>
          ) : (
            <button onClick={onClickGuardarButton} disabled={isPending}>
              {isPending ? <div className="spinner"></div> : "Guardar en Expediente"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
