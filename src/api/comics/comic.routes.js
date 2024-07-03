const express=require("express")
const { getComics, getComicDetails, rateComic, updateRating } = require("./comic.controller")
const {  validateRating, validateUserId } = require("../../middleware/validation")
const comicsRoutes=express.Router()

comicsRoutes.get("/", getComics)
comicsRoutes.get("/:comicId", getComicDetails)
comicsRoutes.post("/:comicId/rate", validateUserId, validateRating, rateComic)

comicsRoutes.put("/:comicId/rate/", validateUserId, validateRating, updateRating)

module.exports= comicsRoutes