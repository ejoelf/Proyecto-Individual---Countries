import "./create.css";

import { useEffect, useState } from "react";
import validateCreate from "../../validator/validateCreate";
import { getAllCountries, postNewActivity } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/navbar";

function Create() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);
  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  const [input, setInput] = useState({
    nombre: "",
    dificultad: 0,
    duracion: "",
    temporada: "",
    countryId: "",
  });

  const [error, setError] = useState({
    nombre: ".",
    dificultad: "",
    duracion: "",
    temporada: "",
    countryId: "",
  });

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setError(
      validateCreate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const [filteredCountries, setFilteredCountries] = useState([]); //Para la coincidencia de países
  const [selectedCountries, setSelectedCountries] = useState([]); //Para mostrar nombre de países agregados
  const [existe, setExiste] = useState(false); //Para saber si renderizar o no botón Agregar
  const [countryToAdd, setCountryToAdd] = useState(""); //Para agregar nuevo nombre país
  const [countryIdToAdd, setCountryIdToAdd] = useState(""); //Para agregar nuevo id país (y así enviar por input)
  const [inputCountry, setInputCountry] = useState(""); //Para limpiar el input luego de agregar
  const [selectedCountriesId, setSelectedCountriesId] = useState([]); //Almacena los IDs para setear al input

  const countryChange = (event) => {
    setInputCountry(event.target.value);
    let nombreInp = event.target.value;

    const filtered = allCountries.filter((countr) =>
      countr.nombre.toLowerCase().includes(nombreInp.toLowerCase())
    );
    setFilteredCountries(filtered); //Para mostrar la lista de países con coincidencia de nombre

    const country = allCountries.find((countr) => countr.nombre === nombreInp); //Para buscar el país con ese nombre

    const idFound = country?.id; // Guarda en idFound el id del país para luego setearlo

    if (country) {
      setExiste(true);
      setCountryToAdd(country?.nombre);

      setCountryIdToAdd(idFound);
    }
  };

  const handleAgregar = (event) => {
    event.preventDefault();
    setSelectedCountries([...selectedCountries, countryToAdd]);
    setCountryToAdd("");
    setExiste(false);
    setInputCountry("");
    setSelectedCountriesId((prevSelectedCountriesId) => [
      ...prevSelectedCountriesId,
      countryIdToAdd,
    ]); //CB, para manejar asincronía
  };

  const handleQuitar = (event) => {
    event.preventDefault();
    setSelectedCountries(
      selectedCountries.filter((countr) => countr !== event.target.value)
    );

    const country = allCountries.find(
      (countr) => countr.nombre === event.target.value
    );

    setSelectedCountriesId(
      selectedCountriesId.filter((countr) => countr !== country.id)
    );
  };

  //Para evitar problemas de asincronía, pues los manejos de estados no se actualizaban inmediatamente
  useEffect(() => {
    /* console.log("Selected Countries Id:", selectedCountriesId); */
    setInput({
      ...input,
      countryId: selectedCountriesId,
    });
  }, [selectedCountriesId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(postNewActivity(input));
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit} className="formStyles">
        <div>
          <label>Nombre</label>
          <input
            placeholder="Nombre de la actividad"
            name="nombre"
            onChange={handleChange}
            value={input.value}
          />
          <span>{error.nombre}</span>
        </div>
        <div>
          <label>Dificultad</label>
          <input
            placeholder="1-5"
            name="dificultad"
            onChange={handleChange}
            value={input.value}
          />
          {input.dificultad /* !== '' */ ? (
            <span>{error.dificultad}</span>
          ) : null}
        </div>
        <div>
          <label>Duracion</label>
          <input
            placeholder="Duración en horas"
            name="duracion"
            onChange={handleChange}
            value={input.value}
          />
          {input.duracion ? <span>{error.duracion}</span> : null}
        </div>
        <div>
          <label>Temporada</label>
          <input
            placeholder="Verano,Otoño,Invierno,Primavera"
            name="temporada"
            onChange={handleChange}
            value={input.value}
          />
          {input.temporada ? <span>{error.temporada}</span> : null}
        </div>
        <div>
          <label>Pais</label>

          <input
            name="countryId"
            onChange={countryChange}
            value={inputCountry}
            list="countries"
          />

          <datalist name="" id="countries">
            {filteredCountries.map((country, id) => (
              <option key={id}>{country.nombre}</option>
            ))}
          </datalist>

          {existe ? <button onClick={handleAgregar}>Agregar</button> : null}
          <ul>
            {selectedCountries.map((countr) => (
              <div key={countr} className="country-item">
                <li>{countr}</li>
                <button value={countr} onClick={handleQuitar}>
                  X
                </button>
              </div>
            ))}
          </ul>

          <span>{error.countryId}</span>
        </div>
        {error.nombre ||
        error.dificultad ||
        error.duracion ||
        error.temporada ||
        !selectedCountries.length ? null : (
          <button type="submit">Crear</button>
        )}
      </form>
    </div>
  );
}

export default Create;
