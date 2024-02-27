import { Link } from "react-router-dom";
import "./error.css";

function Error() {
  return (
    <div className="error-container">
      <h2>Error 404 - Pagina no encontrada</h2>
      <Link to="/home">
        <button>Volver a la home</button>
      </Link>
    </div>
  );
}

export default Error;
