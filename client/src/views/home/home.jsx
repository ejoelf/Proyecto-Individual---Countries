import "./home.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllCountries,
  getCountriesByName,
  orderCards,
  filterCards,
  filterByActivity,
} from "../../redux/actions/actions";

import Navbar from "../../components/navbar/navbar";
import CardsCountries from "../../components/cards/cardsCountries";

function Home() {
  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.allCountries);
  const activities = useSelector((state) => state.activities);

  const [countriesToShow, setCountriesToShow] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  useEffect(() => {
    setCountriesToShow([...allCountries].splice(0, 10));
  }, [allCountries]);

  //paginado
  const prevHandler = () => {
    const prevPage = page - 1;
    if (prevPage < 1) return;
    const firstCountry = (prevPage - 1) * 10;
    setPage(prevPage);
    setCountriesToShow([...allCountries].splice(firstCountry, 10));
  };

  const nextHandler = () => {
    const totalCountries = allCountries.length;
    const nextPage = page + 1;
    const firstCountry = page * 10;
    if (firstCountry > totalCountries) return;
    setPage(nextPage);
    setCountriesToShow([...allCountries].splice(firstCountry, 10));
  };

  const handleChange = (event) => {
    event.preventDefault();
    setSearchString(event.target.value);
    setPage(1);
    setSearchString("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getCountriesByName(searchString));
    setPage(1);
  };

  const handleOrder = (event) => {
    dispatch(orderCards(event.target.value));
    setCountriesToShow([...allCountries].splice(0, 10));
    setPage(1);
  };

  const handleFilter = (event) => {
    dispatch(filterCards(event.target.value));
    setCountriesToShow([...allCountries].splice(0, 10));
    setPage(1);
  };

  const handleFilterByAct = (event) => {
    dispatch(filterByActivity(event.target.value));
    setCountriesToShow([...allCountries].splice(0, 10));
    setPage(1);
  };

  const handleClear = () => {
    dispatch(getAllCountries());
    setPage(1);
  };

  return (
    <div className="container">
      <div className="homeStyle">
        <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />

        <div>
          <select onChange={handleOrder}>
            <option disabled selected>
              Ordenar
            </option>
            <option value="Alfabeticamente(A-Z)">A-Z</option>
            <option value="Alfabeticamente(Z-A)">Z-A</option>
            <option value="Mayor area">Mayor Área</option>
            <option value="Menor area">Menor Área</option>
            <option value="Mayor poblacion">Mayor Población</option>
            <option value="Menor poblacion">Menor Población</option>
          </select>

          <select onChange={handleFilter}>
            <option disabled selected>
              Continentes
            </option>
            <option value="Todos">Todos</option>
            <option value="America">América</option>
            <option value="Asia">Asia</option>
            <option value="Africa">África</option>
            <option value="Europe">Europe</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Oceania">Oceanía</option>
          </select>

          <select onChange={handleFilterByAct}>
            <option disabled selected>
              Actividades
            </option>
            {activities?.map((act) => {
              return <option value={act.nombre}>{act.nombre}</option>;
            })}
          </select>
          <button className="clearFiltered" onClick={handleClear}>
            Limpiar Filtros
          </button>
        </div>

        <CardsCountries
          countriesToShow={countriesToShow}
          prevHandler={prevHandler}
          nextHandler={nextHandler}
          pagina={page}
        />
      </div>
    </div>
  );
}

export default Home;
