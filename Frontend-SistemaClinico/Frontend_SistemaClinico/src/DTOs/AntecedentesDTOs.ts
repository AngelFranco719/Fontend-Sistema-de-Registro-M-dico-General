export type antecedente = "Patologico" | "Heredofamiliares" | "NoPatologico";

export interface antecedenteRelevante {
  type: antecedente;
  categoria: string;
  pregunta: string;
  respuesta: boolean;
  observaciones?: string;
}

export interface getAntecedentesRelevantesDTO {
  antecedentes: antecedenteRelevante[];
}
