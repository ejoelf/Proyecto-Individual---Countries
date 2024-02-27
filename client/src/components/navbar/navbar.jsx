import "./navbar.css";
import { Link } from "react-router-dom";

function Navbar({ handleChange, handleSubmit }) {
  return (
    <div className="search-box">
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/activities">
        <button>Actividades</button>
      </Link>
      <h2 className="homeTittle">Por el Mundo</h2>
      <form className="NavForm" onChange={handleChange}>
        <input
          className="inputNavForm"
          placeholder="Ingrese nombre"
          type="search"
        />
        <button type="submit" onClick={handleSubmit}>
          Buscar
        </button>
        <Link to="/">
          <button>Salir</button>
        </Link>
      </form>
    </div>
  );
}

export default Navbar;
