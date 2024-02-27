import "./cardCountry.css";
import { Link } from "react-router-dom";

function CardCountry({ country }) {
  const { id, nombre, imagenBandera, capital, continente } = country;

  return (
    <div className="flip-card">
      <Link to={`/detail/${id}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={imagenBandera} alt="bandera" />
            <p>{nombre}</p>
          </div>
          <div className="flip-card-back">
            <p>Nombre: {nombre}</p>
            <p>Capital: {capital}</p>
            <p>Continente: {continente}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardCountry;
