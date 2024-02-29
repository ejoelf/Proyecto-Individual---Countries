const { Router } = require("express");

const {
  postActivity,
  getActivities,
} = require("../handlers/activitiesHandler");

const activitiesRouter = Router();

activitiesRouter.get("/", getActivities);
activitiesRouter.post("/", postActivity);

module.exports = activitiesRouter;
