import "./cardsCountries.css";
import CardCountry from "../card/country/cardCountry";

function CardsCountries({ countriesToShow, prevHandler, nextHandler, pagina }) {
  const countriesList = countriesToShow;

  return (
    <div>
      <h4 className="paginaStyle">Página N°: {pagina}</h4>
      <button className="btn-change" onClick={prevHandler}>
        anterior
      </button>
      <button className="btn-change" onClick={nextHandler}>
        siguiente
      </button>

      <div className="card-list">
        {countriesList.length ? (
          countriesList?.map((country) => (
            <CardCountry key={country.id} country={country} />
          ))
        ) : (
          <h5>Cargando...</h5>
        )}
      </div>
    </div>
  );
}

export default CardsCountries;
