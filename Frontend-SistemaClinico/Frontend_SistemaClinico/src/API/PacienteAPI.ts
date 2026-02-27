import { baseURL } from "../Config/env";
import type { CrearPacienteDTO } from "../DTOs/PacienteDTOs";

export async function POSTPaciente(paciente: CrearPacienteDTO) {
  const res = await fetch(`${baseURL}api/paciente`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paciente),
  });

  if (!res.ok) throw new Error("Error creando paciente");

  return res.json();
}

export async function GetAllPacientesToDashboard() {
  const res = await fetch(`${baseURL}api/paciente/GetAllPacientesDashboard`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Error obteniendo pacientes");
  return res.json();
}
