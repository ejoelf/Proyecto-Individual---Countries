const { Country, Activity } = require("../data/db.js");

const getAllCountries = async () => {
  try {
    const countries = await Country.findAll({
      include: [
        {
          model: Activity,
          as: "Activities",
          attributes: ["nombre"],
          through: { attributes: [] },
        },
      ],
    });
    return countries;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllCountries };
