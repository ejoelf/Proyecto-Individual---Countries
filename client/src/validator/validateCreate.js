const validateCreate = (input) => {
  let error = {};

  if (input.nombre.length < 1) {
    error.nombre = "El nombre no puede estar vacío";
  }
  if (typeof input.nombre === "number") {
    error.nombre = "El nombre debe ser un texto";
  }

  if (input.dificultad < 1 || input.dificultad > 5 || isNaN(input.dificultad)) {
    error.dificultad = "La dificultad debe ser entre 1 y 5";
  }

  if (isNaN(input.duracion) || input.duracion <= 0) {
    error.duracion = "La duracion debe estar en horas";
  }

  if (input.temporada) {
    let temporadaLower = input.temporada.toLowerCase();
    if (
      temporadaLower !== "verano" &&
      temporadaLower !== "invierno" &&
      temporadaLower !== "otoño" &&
      temporadaLower !== "primavera"
    ) {
      error.temporada = "La temporada no es correcta";
    }
  }
  if (input.temporada === "") {
    error.temporada = "La temporada no es correcta";
  }

  return error;
};

export default validateCreate;