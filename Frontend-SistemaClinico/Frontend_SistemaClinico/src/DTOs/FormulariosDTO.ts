type FormularioCategoria = "Antecedentes" | "Clinico" | "Otro";

export interface PreguntaFormularioDTO {
  preguntaFormularioId: number;
  pregunta: string;
  orden: number;
  respuestaFormulario: RespuestaFormulario[];
}

export interface SubformulariosDTO {
  id: number;
  titulo: string;
  preguntas: PreguntaFormularioDTO[];
}

export interface GetFormularioDTO {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: FormularioCategoria;
  subformularios: SubformulariosDTO[];
}

export interface PostRespuestaAntecedentes {
  preguntaId: number;
  formularioTitulo: string;
  respuesta: string;
  fecha: string;
  pacienteNombre: string;
  pacienteApellido: string;
}

export interface RespuestaFormulario {
  fecha: string;
  respuesta: string;
}

export interface AntecedenteFormularioStateDTO {
  nombreAntecedente: string;
  state: boolean;
}
