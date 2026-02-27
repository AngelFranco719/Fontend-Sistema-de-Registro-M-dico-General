import { baseURL } from "../Config/env";

export async function GETHistoriaClinicaByPacienteId(id: number) {
  const res = await fetch(`${baseURL}api/HistoriaClinica/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Error obteniendo la Historia Clínica");

  return res.json();
}
