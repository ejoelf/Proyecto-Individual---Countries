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
            <h1>ID: {detail.id}</h1>
            <h1>Nombre: {detail.nombre}</h1>
            <h1>Capital: {detail.capital}</h1>
            <h1>Continente: {detail.continente}</h1>
            <h1>Sub-Region: {detail.subRegion}</h1>
            <h1>Area: {detail.area}</h1>
            <h1>Población: {detail.poblacion}</h1>
            {detail.Activities?.map((act) => (
              <div>
                <h3>Actividad: {act.nombre}</h3>
                <h3>Temporada: {act.temporada}</h3>
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
