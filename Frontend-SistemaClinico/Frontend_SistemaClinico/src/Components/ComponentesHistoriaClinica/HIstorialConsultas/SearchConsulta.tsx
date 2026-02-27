import "./SearchConsulta.css";

interface propsSearchConsulta {
  diagnosticos: string[];
}

export const SearchConsulta = ({ diagnosticos }: propsSearchConsulta) => {
  return (
    <>
      <div className="SearchConsulta">
        <label>Filtros: </label>
        <select title="Periodo de Tiempo">
          <option selected disabled hidden>
            Buscar por Diagnóstico
          </option>
          {diagnosticos.map((diagnostico) => {
            return <option>{diagnostico}</option>;
          })}
        </select>
        <select title="Periodo de Tiempo">
          <option selected disabled hidden>
            Periodo de Tiempo
          </option>
          <option>Hace una semana</option>
          <option>Hace un mes</option>
          <option>Hace tres meses</option>
          <option>Hace un año</option>
          <option>Todas</option>
        </select>
      </div>
    </>
  );
};
