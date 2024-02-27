const { Router } = require("express");

const activitiesRouter = Router();

const {postActivity,getActivities}=require ('../handlers/activitiesHandler');


activitiesRouter.get('/',getActivities)
activitiesRouter.post('/',postActivity)

module.exports= activitiesRouter;