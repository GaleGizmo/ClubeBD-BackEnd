const express=require("express")
const { getComics, getComicDetails, rateComic, updateRating, createComic } = require("./comic.controller")
const {  validateRating } = require("../../middleware/validation")
const {upload, handleUploadErrors} = require("../../middleware/img")
const { authenticateUser } = require("../../middleware/auth")
const comicsRoutes=express.Router()

comicsRoutes.get("/:season", getComics)
comicsRoutes.get("/details/:comicId", getComicDetails)
comicsRoutes.post("/add-comic", authenticateUser, upload.single("cover"), handleUploadErrors, createComic)
comicsRoutes.post("/details/:comicId/rate", authenticateUser, validateRating, rateComic)

comicsRoutes.put("/details/:comicId/rate/", authenticateUser, validateRating, updateRating)

module.exports= comicsRoutes