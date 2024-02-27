import CardActivity from "../../components/card/activity/cardActivity";
import Navbar from "../../components/navbar/navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./activities.css";

function Activities() {
  const activities = useSelector((state) => state.activities);

  return (
    <div>
      <Navbar />
      <Link to="/create">
        <button>Crear Actividad</button>
      </Link>
      <div className="card-act">
        {activities.length ? (
          activities?.map((activity) => (
            <CardActivity key={activity.nombre} activity={activity} />
          ))
        ) : (
          <h3>Aun no hay actividades creadas</h3>
        )}
      </div>
    </div>
  );
}

export default Activities;
