import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { POSTPaciente, GetAllPacientesToDashboard } from "../API/PacienteAPI";

export function useCreatePaciente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: POSTPaciente,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pacientes"],
      });
    },
  });
}

export function useGetAllPacientesDashboard() {
  return useQuery({
    queryKey: ["pacientes"],
    queryFn: GetAllPacientesToDashboard,
    staleTime: 1000 * 60 * 5,
  });
}
