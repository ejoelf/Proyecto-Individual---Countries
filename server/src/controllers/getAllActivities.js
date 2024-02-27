const { Activity, Country } = require("../data/db.js");

const getAllActivities = async () => {
  try {
    const activities = await Activity.findAll({
      include: [
        {
          model: Country,
          as: "Countries",
          attributes: ["nombre"],
          through: { attributes: [] },
        },
      ],
    });
    return activities;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllActivities };
