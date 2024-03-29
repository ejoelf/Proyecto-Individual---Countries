import Navbar from "../../components/navbar/navbar";
import CardActivity from "../../components/card/activity/cardActivity";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./activities.css";
import { useEffect } from "react";
import { getAllActivities } from "../../redux/actions/actions";

function Activities() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  return (
    <div className="activities-container">
      <Navbar />
      <Link to="/create">
        <button className="btn-create">Crear Actividad</button>
      </Link>
      <div className="card-act">
        {activities.length ? (
          activities?.map((activity) => (
            <CardActivity key={activity.nombre} activity={activity} />
          ))
        ) : (
          <h2>Aun no hay actividades creadas</h2>
        )}
      </div>
    </div>
  );
}

export default Activities;
