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

  const [searchString, setSearchString] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setSearchString(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getCountriesByName(searchString));
  };

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    setCountriesToShow([...allCountries].splice(0, 10));
  }, [allCountries]);

  const [page, setPage] = useState(1);

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

  const handleOrder = (event) => {
    dispatch(orderCards(event.target.value));
    setCountriesToShow([...allCountries].splice(0, 10)); //Para solucionar problema de asincronía y forzar el renderizado actual
    setPage(1);
  };
  const handleFilter = (event) => {
    dispatch(filterCards(event.target.value));
    setPage(1);
  };

  const activities = useSelector((state) => state.activities);

  const handleFilterByAct = (event) => {
    dispatch(filterByActivity(event.target.value));
    setCountriesToShow([...allCountries].splice(0, 10)); //Para solucionar problema de asincronía y forzar el renderizado actual
    setPage(1);
  };
  return (
    <div className="homeStyle">
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />

      <div>
        <select onChange={handleOrder}>
          <option value="" disabled selected>
            Ordenar
          </option>

          <option value="Alfabeticamente">Alfabeticamente</option>
          <option value="Mayor area">Mayor Área</option>
          <option value="Mayor poblacion">Mayor Población</option>
        </select>
        <select onChange={handleFilter}>
          <option value="" disabled selected>
            Continente
          </option>
          <option value="Todos">Todos</option>
          <option value="America">América</option>
          <option value="{Asia}">Asia</option>
          <option value="{Africa}">África</option>
          <option value="{Europe}">Europe</option>
          <option value="{Antarctica}">Antarctica</option>
          <option value="{Oceania}">Oceanía</option>
        </select>
        <select onChange={handleFilterByAct}>
          {activities?.map((act) => {
            return <option value={act.nombre}>{act.nombre}</option>;
          })}
        </select>
      </div>
      <CardsCountries
        countriesToShow={countriesToShow}
        prevHandler={prevHandler}
        nextHandler={nextHandler}
        pagina={page}
      />
    </div>
  );
}

export default Home;
