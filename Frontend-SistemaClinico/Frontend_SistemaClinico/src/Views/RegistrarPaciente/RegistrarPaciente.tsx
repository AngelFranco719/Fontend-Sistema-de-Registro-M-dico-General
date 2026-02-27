import { useEffect, useState } from "react";
import { PreguntaCrearPaciente } from "../../Components/CrearPacientePregunta/PreguntaCrearPaciente";
import "./RegistrarPaciente.css";
import { IncompleteFormAlertPaciente } from "../../Components/Alertas/AlertaFormsIncompletoPaciente/IncompleteFormAlertPaciente";
import { AlertaFormsConfirmarPaciente } from "../../Components/Alertas/AlertaFormsConfirmarPaciente/AlertaFormsConfirmarPaciente";
import type { CrearPacienteDTO } from "../../DTOs/PacienteDTOs";
import { useCreatePaciente } from "../../Hooks/usePacienteAPI";
import { useNavigate } from "react-router-dom";
import { usePaciente } from "../../context/PacienteContext";
import { isGetHistoriaClinicaDTO } from "../../DTOs/HistoriaClinicaDTOs";

export type PacienteResponseType = "number" | "string" | "h/m" | "date";

interface form {
  form: string;
  isMandatory: boolean;
  type: PacienteResponseType;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

interface RegistrarPacienteProps {
  onBack?: () => void;
}

export const RegistrarPaciente = ({ onBack }: RegistrarPacienteProps) => {
  const [nombre, setNombre] = useState<string>("");
  const [apellidos, setApellidos] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");
  const [fechaN, setFechaN] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [contactoE, setContactoE] = useState<string>("");
  const [curp, setCurp] = useState<string>("");
  const [missingAlert, setMissingAlert] = useState<boolean>(false);
  const [confirmAlert, setConfirmAlert] = useState<boolean>(false);
  const [faltantes, setFaltantes] = useState<string[]>([]);
  const [paciente, setPaciente] = useState<CrearPacienteDTO | undefined>();
  const [savePaciente, setSavePaciente] = useState<boolean>(false);

  const { mutate, isPending } = useCreatePaciente();
  const { setHistoriaClinica, setPacienteActual } = usePaciente();
  const navigate = useNavigate();
  useEffect(() => {
    if (savePaciente) {
      const newPaciente: CrearPacienteDTO = {
        nombres: nombre,
        apellidos: apellidos,
        fechaNacimiento: fechaN,
        sexo: normalizeSexo(sexo),
        contactoEmergencia: contactoE,
        curp: curp,
        telefono: telefono,
      };
      mutate(newPaciente, {
        onSuccess: (response) => {
          if (isGetHistoriaClinicaDTO(response)) {
            setHistoriaClinica(response);
            setPacienteActual(response.informacionPaciente);
            navigate("/historia")
          }
        },
        onError: (error) => {
          console.warn(error);
        },
      });
    }
  }, [savePaciente]);

  const formulario: form[] = [
    {
      form: "Nombres",
      isMandatory: true,
      type: "string",
      setValue: setNombre,
      value: nombre,
    },
    {
      form: "Apellidos",
      isMandatory: true,
      type: "string",
      setValue: setApellidos,
      value: apellidos,
    },
    {
      form: "Sexo",
      isMandatory: true,
      type: "h/m",
      setValue: setSexo,
      value: sexo,
    },
    {
      form: "Fecha de Nacimiento",
      isMandatory: true,
      type: "date",
      setValue: setFechaN,
      value: fechaN,
    },
    {
      form: "Teléfono",
      isMandatory: false,
      type: "string",
      setValue: setTelefono,
      value: telefono,
    },
    {
      form: "Contacto de Emergencia",
      isMandatory: false,
      type: "string",
      setValue: setContactoE,
      value: contactoE,
    },
    {
      form: "CURP",
      isMandatory: false,
      type: "string",
      setValue: setCurp,
      value: curp,
    },
  ];

  const isNullOrWhiteSpace = (value?: string | null) => {
    return !value || value.trim().length == 0;
  };

  const normalizeSexo = (sexo: string) => {
    switch (sexo) {
      case "hombre":
        return "Masculino";
      case "mujer":
        return "Femenino";
      default:
        return "NoEspecificado";
    }
  };

  const handleCreateClick = () => {
    const faltan: string[] = [];
    formulario.forEach((pregunta) => {
      if (
        pregunta.isMandatory &&
        (!pregunta.value || isNullOrWhiteSpace(pregunta.value))
      ) {
        faltan.push(pregunta.form);
      }
    });
    if (faltan.length > 0) {
      setFaltantes([...faltan]);
      setMissingAlert(true);
    } else {
      setConfirmAlert(true);
      const nuevoPaciente: CrearPacienteDTO = {
        nombres: nombre,
        apellidos: apellidos,
        fechaNacimiento: fechaN,
        sexo: normalizeSexo(sexo),
        contactoEmergencia: contactoE,
        telefono: telefono,
        curp: curp,
      };
      setPaciente(nuevoPaciente);
    }
  };

  return (
    <div className="RegistrarPacienteMain">
      {onBack && (
        <button className="btn-back" onClick={onBack} title="Volver">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Volver
        </button>
      )}
      <label className="TitleFormPaciente">Nuevo Paciente</label>
      <div className="PacienteFormsContainer">
        {formulario.map((form, index) => {
          return (
            <PreguntaCrearPaciente
              key={index}
              form={form.form}
              isMandatory={form.isMandatory}
              type={form.type}
              setValue={form.setValue}
              value={form.value}
            />
          );
        })}
      </div>
      <button onClick={handleCreateClick}>Registrar Paciente</button>
      {missingAlert ? (
        <IncompleteFormAlertPaciente
          faltantes={faltantes}
          open={missingAlert}
          setOpen={setMissingAlert}
        />
      ) : (
        <></>
      )}
      {confirmAlert && paciente ? (
        <AlertaFormsConfirmarPaciente
          active={confirmAlert}
          setActive={setConfirmAlert}
          paciente={paciente}
          setSavePaciente={setSavePaciente}
          isPending={isPending}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
