import { Link } from "react-router-dom";
import "./landing.css";

function Landing() {
  return (
    <div className="landing-container">
      <h1>BIENVENIDOS A POR EL MUNDO</h1>
      <h2>¿Te gustaría hacer un recorrido?</h2>
      <Link to="/home">
        <button>INGRESAR</button>
      </Link>
    </div>
  );
}

export default Landing;
