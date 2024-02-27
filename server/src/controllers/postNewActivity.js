const { Activity } = require("../data/db.js");

const postNewActivity = async (
  nombre,
  dificultad,
  duracion,
  temporada,
  countryId
) => {
  try {
    const newActivity = await Activity.create({
      nombre,
      dificultad,
      duracion,
      temporada,
    });

    await newActivity.setCountries(countryId);
    return newActivity;
  } catch (error) {
    throw error;
  }
};

module.exports = { postNewActivity };
