import type { ResumenConsultaClinicaDTO } from "./ConsultaClinicaDTO";
import type {
  AntecedenteFormularioStateDTO,
  GetFormularioDTO,
} from "./FormulariosDTO";
import type { InformacionGeneralPacienteDTO } from "./PacienteDTOs";

export interface GetHistoriaClinicaDTO {
  informacionPaciente: InformacionGeneralPacienteDTO;
  antecedentesHeredofamiliares: GetFormularioDTO;
  antecedentesPatologicos: GetFormularioDTO;
  antecedentesNoPatologicos: GetFormularioDTO;
}

export function isGetHistoriaClinicaDTO(
  data: any,
): data is GetHistoriaClinicaDTO {
  return (
    data !== null && typeof data === "object" && "informacionPaciente" in data
  );
}
