import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  //Usestate para la búsqueda
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  //Controlando la busqueda
  const [consultar, setConsultar] = useState(false);

  //Controlando el resultado
  const [resultado, setResultado] = useState({});

  //Manejar el error 404 de la api
  const [error, setError] = useState(false);

  //extraer valores
  const { ciudad, pais } = busqueda;

  //Useeffect
  useEffect(() => {
    const consultarApi = async () => {
      if (consultar) {
        const appId = "d500adbf300db4c7ea24bf8b7653b88b";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado);
        setConsultar(false);

        //Detecta si hubo resultado correctos en la consulta
        if (resultado.cod === "404") {
          setError(true);
        } else {
          setError(false);
        }
      }
    };
    consultarApi();
  }, [consultar]);

  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultados" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }

  return (
    <Fragment>
      <Header titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
