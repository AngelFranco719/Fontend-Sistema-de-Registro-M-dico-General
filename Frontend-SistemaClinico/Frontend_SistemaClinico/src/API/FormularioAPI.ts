import { baseURL } from "../Config/env";
import type {
  GetFormularioDTO,
  PostRespuestaAntecedentes,
} from "../DTOs/FormulariosDTO";

export async function POSTAntecedenteResponse(
  response: PostRespuestaAntecedentes,
): Promise<GetFormularioDTO> {
  const res = await fetch(`${baseURL}api/formulario/SaveResponseAntecedentes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response),
  });

  if (!res.ok) throw new Error("Error guardando antecedente");

  return res.json();
}
