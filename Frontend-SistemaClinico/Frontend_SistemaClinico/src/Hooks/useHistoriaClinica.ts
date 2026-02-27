import { useQuery } from "@tanstack/react-query";
import { GETHistoriaClinicaByPacienteId } from "../API/HistoriaClinicaAPI";

export function useGetHistoriaClinica(
  pacienteId: number,
  options: { enabled: boolean },
) {
  return useQuery({
    queryKey: ["pacientes", "historia", pacienteId],
    queryFn: () => GETHistoriaClinicaByPacienteId(pacienteId),
    enabled: options.enabled && pacienteId !== 0,
  });
}
