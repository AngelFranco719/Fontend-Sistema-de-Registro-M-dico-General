import { Outlet } from "react-router-dom";
import { CurrentFormularioProvider } from "../../context/CurrentFormularioContext";

export const FormularioLayout = () => (
  <CurrentFormularioProvider>
    <Outlet />
  </CurrentFormularioProvider>
);
