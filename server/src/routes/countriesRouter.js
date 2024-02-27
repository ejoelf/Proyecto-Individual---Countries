const { Router } = require("express");

const countriesRouter = Router();

const {getCountries,getCountryById}= require('../handlers/countriesHandler');


countriesRouter.get('/',getCountries)
countriesRouter.get('/:id',getCountryById)


module.exports= countriesRouter;