const { Country } = require("../data/db.js");
const { Op } = require("sequelize");

const countryByName = async (nombre) => {
  try {
    const lowerName = nombre.toLowerCase();
    let countriesFound = await Country.findAll({
      where: { nombre: { [Op.iLike]: `%${lowerName}%` } },
    });
    if (countriesFound.length === 0) {
      countriesFound = "No existen países con esa coincidencia";
    }
    return countriesFound;
  } catch (error) {
    throw error(error);
  }
};

module.exports = { countryByName };
