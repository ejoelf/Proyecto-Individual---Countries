const { Country, Activity } = require("../data/db.js");

const countryById = async (id) => {
  try {
    const country = await Country.findOne({
      where: { id: id },
      include: [
        {
          model: Activity,
          as: "Activities",
          attributes: ["nombre", "temporada"],
          through: { attributes: [] },
        },
      ],
    });
    return country;
  } catch (error) {
    throw error;
  }
};

module.exports = { countryById };
