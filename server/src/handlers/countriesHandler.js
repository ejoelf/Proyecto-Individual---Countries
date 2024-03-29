const { countryById } = require("../controllers/getCountryById.js");
const { getAllCountries } = require("../controllers/getAllCountries.js");
const { countryByName } = require("../controllers/getCountryByName.js");

const getCountries = async (req, res) => {
  const { nombre } = req.query;
  try {
    if (nombre) {
      const response = await countryByName(nombre);
      res.status(200).json(response);
    } else {
      const response = await getAllCountries();
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCountryById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await countryById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCountries,
  getCountryById,
};
