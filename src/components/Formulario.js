import React, { useState } from "react";
import Error from "./Error";
const Formulario = ({ busqueda, setBusqueda, setConsultar }) => {
  //Usestate para manjear errores
  const [error, setError] = useState(false);

  //Extraer los valores
  const { ciudad, pais } = busqueda;

  //Onchange function

  const handleChange = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    //Validar
    if (ciudad.trim() === "" || pais.trim() === "") {
      setError(true);
      return;
    }

    //Componente principal
    setConsultar(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error mensaje="Ambos campos son obligatorios" /> : null}
      <div className="input-field col s12">
        <input
          type="text"
          name="ciudad"
          id="ciudad"
          value={ciudad}
          onChange={handleChange}
        />
        <label htmlFor="ciudad">Ciudad:</label>
      </div>

      <div className="input-field col s12">
        <select name="pais" id="id" value={pais} onChange={handleChange}>
          <option value="">-- Selecione un país --</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
        <label htmlFor="pais">País:</label>
      </div>
      <div className="input-field col s12">
        <button
          type="submit"
          className="waves-effect waves-light btn-large btn-block yellow accent-4 col s12 black-text"
        >
          Buscar Clima
        </button>
      </div>
    </form>
  );
};

export default Formulario;
