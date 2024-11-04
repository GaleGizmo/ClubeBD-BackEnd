const express=require("express")
const { getComics, getComicDetails, rateComic, updateRating, createComic } = require("./comic.controller")
const {  validateRating, validateUserId } = require("../../middleware/validation")
const upload = require("../../middleware/img")
const comicsRoutes=express.Router()

comicsRoutes.get("/:season", getComics)
comicsRoutes.get("/details/:comicId", getComicDetails)
comicsRoutes.post("/add-comic", upload.single("cover"), createComic)
comicsRoutes.post("/details/:comicId/rate", validateUserId, validateRating, rateComic)

comicsRoutes.put("/details/:comicId/rate/", validateUserId, validateRating, updateRating)

module.exports= comicsRoutes