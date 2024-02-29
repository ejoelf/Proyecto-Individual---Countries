import { getDetailCountry } from "../../redux/actions/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import "./detail.css";

function Detail() {
  const detail = useSelector((state) => state.detailCountry);
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getDetailCountry(id));
  }, []);

  return (
    <div>
      <Navbar />

      {detail.nombre ? (
        <div className="detail-container">
          <div>
            <img
              className="imgdetailStyle"
              src={detail.imagenBandera}
              alt={detail.nombre}
            />
          </div>
          <div className="detail-data">
            <h2>ID: {detail.id}</h2>
            <h2>Nombre: {detail.nombre}</h2>
            <h2>Capital: {detail.capital}</h2>
            <h2>Continente: {detail.continente}</h2>
            <h2>Sub-Region: {detail.subRegion}</h2>
            <h2>Area: {detail.area}</h2>
            <h2>Población: {detail.poblacion}</h2>

            {detail.Activities?.map((act) => (
              <div className="detail-activity">
                <h2>Actividad: {act.nombre}</h2>
                <h2>Temporada: {act.temporada}</h2>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1>Cargando Información...</h1>
      )}
    </div>
  );
}

export default Detail;
