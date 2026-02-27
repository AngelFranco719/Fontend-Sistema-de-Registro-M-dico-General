import { useMutation, useQueryClient } from "@tanstack/react-query";
import { POSTAntecedenteResponse } from "../API/FormularioApi";

export function usePostAntecedenteResponse(pacienteId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: POSTAntecedenteResponse,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pacientes", "historia", pacienteId],
      });
    },
  });
}
