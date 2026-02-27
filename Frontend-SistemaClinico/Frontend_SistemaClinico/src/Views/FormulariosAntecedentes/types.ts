export interface pregunta {
  texto: string;
  respuesta: "si" | "no" | "desconoce";
  observaciones: string;
}

export interface categoria {
  titulo: string;
  preguntas: pregunta[];
  respuesta: "si" | "no" | "desconoce";
}

export type RecordCategoryOptions = "Si" | "No" | "Desconoce";
