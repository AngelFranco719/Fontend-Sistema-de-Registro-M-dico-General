import type { InformacionGeneralPacienteDTO } from "../../DTOs/PacienteDTOs";
import "./InformacionGeneralPaciente.css";

export interface InformacionGeneralPacienteProps {
  paciente: InformacionGeneralPacienteDTO;
}

export const InformacionGeneralPaciente = (
  props: InformacionGeneralPacienteProps,
) => {
  return (
    <>
      <div className="InformacionGeneral">
        <label className="Title">Información General</label>
        <label>
          <span>Nombres: </span> {props.paciente.nombres}
        </label>
        <label>
          <span>Apellidos: </span> {props.paciente.apellidos}
        </label>
        <label>
          <span>Edad: </span> {props.paciente.edad} años
        </label>
        <label>
          <span>Fecha de Nacimiento: </span> {props.paciente.fechaNacimiento}
        </label>
        <label>
          <span>Sexo: </span>{" "}
          {props.paciente.sexo == "NoEspecificado"
            ? "No Especificado"
            : props.paciente.sexo}
        </label>
        <label>
          <span>Telefono: </span>{" "}
          {props.paciente.telefono
            ? props.paciente.telefono
            : "No Especificado"}
        </label>
        <label>
          <span>Contacto de Emergencia: </span>{" "}
          {props.paciente.contactoEmergencia
            ? props.paciente.contactoEmergencia
            : "No Especificado"}
        </label>
        <label>
          <span>CURP: </span>{" "}
          {props.paciente.curp ? props.paciente.curp : "No Especificado"}
        </label>
      </div>
    </>
  );
};
