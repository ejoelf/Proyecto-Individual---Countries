const server = require("./src/server/server.js");
const { conn } = require("./src/data/db.js");
const { saveCountriesInDb } = require("./src/data/saveCountriesInDb.js");
const PORT = 5000;

conn
  .sync({ force: true })
  .then(() => {
    saveCountriesInDb(); //Para guardar todos los países en mi base de datos
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
