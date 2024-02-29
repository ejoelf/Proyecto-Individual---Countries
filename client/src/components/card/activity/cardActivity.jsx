import "./cardActivity.css";

function CardActivity({ activity }) {
  const { id, nombre, dificultad, duracion, temporada } = activity;

  return (
    <div className="cardActivityStyles">
      <p>ID: {id}</p>
      <p>Nombre: {nombre}</p>
      <p>Dificultad: {dificultad}</p>
      <p>Duración: {duracion} horas</p>
      <p>Temporada: {temporada}</p>
    </div>
  );
}

export default CardActivity;
