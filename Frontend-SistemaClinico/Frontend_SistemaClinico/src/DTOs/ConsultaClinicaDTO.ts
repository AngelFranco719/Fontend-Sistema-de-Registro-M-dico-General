import type {
  AntecedenteFormularioStateDTO,
  GetFormularioDTO,
} from "./FormulariosDTO";
import type { InformacionGeneralPacienteDTO } from "./PacienteDTOs";

export interface SintomaDTO {
  descripcion: string;
  severidad: string | number;
  agravantes: string;
}

export interface PadecimientoActualStateDTO {
  motivoConsulta: string;
  tiempoInicio: string;
  desencadenante: {
    respuesta: boolean | null;
    detalles: string;
  };
  sintomas: SintomaDTO[];
}

export interface ResumenConsultaClinicaDTO {
  fecha: string;
  motivoConsulta: string;
  tratamiento: string;
}

export interface ConsultaClinicaStateDTO {
  paciente: InformacionGeneralPacienteDTO | null;
  padecimientoActual: PadecimientoActualStateDTO;
  interrogatorioDirigido: GetFormularioDTO | null;
  exploracionFisica: GetFormularioDTO | null;
}
