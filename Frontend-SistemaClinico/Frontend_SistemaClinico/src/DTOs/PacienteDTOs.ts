export interface CrearPacienteDTO {
  nombres: string;
  apellidos: string;
  sexo: "Masculino" | "Femenino" | "NoEspecificado";
  fechaNacimiento: string;
  telefono?: string;
  contactoEmergencia?: string;
  curp?: string;
}

export interface InformacionGeneralPacienteDTO {
  pacienteId: number;
  nombres: string;
  apellidos: string;
  sexo: "Masculino" | "Femenino" | "NoEspecificado";
  fechaRegistro: string;
  fechaNacimiento: string;
  edad: number;
  telefono?: string;
  contactoEmergencia?: string;
  curp?: string;
}

export interface DashboardPacienteInformationDTO {
  pacienteId: number;
  nombre: string;
  edad: number;
  sexo: string;
  telefono: string;
  fechaRegistro: string;
}

export interface GetAllPacientesDashboardDTO {
  allPacientes: DashboardPacienteInformationDTO[];
}

export function isGetAllPacientesDashboardDTO(
  data: any,
): data is GetAllPacientesDashboardDTO {
  return (
    data !== null &&
    typeof data === "object" &&
    Array.isArray(data.allPacientes)
  );
}
