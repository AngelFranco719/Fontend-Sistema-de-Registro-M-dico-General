import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PacienteProvider } from "./context/PacienteContext";
import { ManagerDashboard } from "./Views/ManagerDashboard/ManagerDashboard";
import { RegistrarPaciente } from "./Views/RegistrarPaciente/RegistrarPaciente";
import { HistoriaClinica } from "./Views/HistoriaClinica/HistoriaClinica";
import { ConsultaClinica } from "./Views/ConsultaClinica/ConsultaClinica";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AntecedentesView } from "./Views/AntecedentesView/AntecedentesView";
import { CurrentFormularioProvider } from "./context/CurrentFormularioContext";
import { FormularioLayout } from "./Views/AntecedentesView/AntecedentesLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PacienteProvider>
        <BrowserRouter>
          <div className="main">
            <Routes>
              <Route path="/" element={<ManagerDashboard />} />
              <Route path="/registrar" element={<RegistrarPaciente />} />
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/Consulta" element={<ConsultaClinica />} />
              <Route element={<FormularioLayout />}>
                <Route path="/historia" element={<HistoriaClinica />} />
                <Route
                  path="/Antecedentes/:nombreFormulario"
                  element={<AntecedentesView />}
                />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </PacienteProvider>
    </QueryClientProvider>
  );
}

export default App;
