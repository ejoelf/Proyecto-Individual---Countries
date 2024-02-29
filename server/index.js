const server = require("./src/server/server.js");
const { conn } = require("./src/data/db.js");
const { saveCountriesInDb } = require("./src/data/saveCountriesInDb.js");
const PORT = 5000;

conn
  .sync({ force: true })
  .then(() => {
    saveCountriesInDb();
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
