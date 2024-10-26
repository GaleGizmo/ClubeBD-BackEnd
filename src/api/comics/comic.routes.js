const express=require("express")
const { getComics, getComicDetails, rateComic, updateRating } = require("./comic.controller")
const {  validateRating, validateUserId } = require("../../middleware/validation")
const comicsRoutes=express.Router()

comicsRoutes.get("/:season", getComics)
comicsRoutes.get("/details/:comicId", getComicDetails)
comicsRoutes.post("/details/:comicId/rate", validateUserId, validateRating, rateComic)

comicsRoutes.put("/details/:comicId/rate/", validateUserId, validateRating, updateRating)

module.exports= comicsRoutes