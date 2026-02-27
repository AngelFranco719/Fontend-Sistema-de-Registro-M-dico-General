import { createContext, useContext, useState, type ReactNode } from "react";
import type { InformacionGeneralPacienteDTO } from "../DTOs/PacienteDTOs";
import type { GetHistoriaClinicaDTO } from "../DTOs/HistoriaClinicaDTOs";

interface PacienteContextType {
  pacienteActual: InformacionGeneralPacienteDTO | null;
  historiaClinica: GetHistoriaClinicaDTO | null;
  setHistoriaClinica: (p: GetHistoriaClinicaDTO | null) => void;
  setPacienteActual: (p: InformacionGeneralPacienteDTO | null) => void;
}

const PacienteContext = createContext<PacienteContextType | undefined>(
  undefined,
);

export const PacienteProvider = ({ children }: { children: ReactNode }) => {
  const [pacienteActual, setPacienteActual] =
    useState<InformacionGeneralPacienteDTO | null>(null);
  const [historiaClinica, setHistoriaClinica] =
    useState<GetHistoriaClinicaDTO | null>(null);

  return (
    <PacienteContext.Provider
      value={{
        pacienteActual,
        setPacienteActual,
        historiaClinica,
        setHistoriaClinica,
      }}
    >
      {children}
    </PacienteContext.Provider>
  );
};

export const usePaciente = (): PacienteContextType => {
  const ctx = useContext(PacienteContext);
  if (!ctx)
    throw new Error("usePaciente debe usarse dentro de PacienteProvider");
  return ctx;
};
