import { createContext, useContext, useState, type ReactNode } from "react";
import type { GetFormularioDTO } from "../DTOs/FormulariosDTO";

interface FormularioContextType {
  currentFormulario: GetFormularioDTO | null;
  setCurrentFormulario: (p: GetFormularioDTO | null) => void;
}

const CurrentFormularioContext = createContext<
  FormularioContextType | undefined
>(undefined);

export const CurrentFormularioProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentFormulario, setCurrentFormulario] =
    useState<GetFormularioDTO | null>(null);

  return (
    <CurrentFormularioContext.Provider
      value={{
        currentFormulario,
        setCurrentFormulario,
      }}
    >
      {children}
    </CurrentFormularioContext.Provider>
  );
};

export const useCurrentFormulario = (): FormularioContextType => {
  const ctx = useContext(CurrentFormularioContext);
  if (!ctx)
    throw new Error(
      "useCurrentFormulario debe usarse dentro de CurrentFormularioProvider",
    );
  return ctx;
};
