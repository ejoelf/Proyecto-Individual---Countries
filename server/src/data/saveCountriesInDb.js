const { Country } = require("./db.js");
let axios = require("axios");

const saveCountriesInDb = async () => {
  try {
    const { data } = await axios.get(`http://localhost:5000/countries/`);
    const countriesFiltered = [];

    data.map(
      ({
        name,
        cca3,
        flags,
        continents,
        capital,
        subregion,
        area,
        population,
      }) => {
        capital
          ? countriesFiltered.push({
              nombre: name.common,
              id: cca3,
              imagenBandera: flags.png,
              continente: continents,
              capital: capital,
              subRegion: subregion,
              area: area,
              poblacion: population,
            })
          : null;
      }
    );
    await Country.bulkCreate(countriesFiltered);

    return countriesFiltered;
  } catch (error) {
    return "No se pudieron cargar";
  }
};

module.exports = { saveCountriesInDb };
