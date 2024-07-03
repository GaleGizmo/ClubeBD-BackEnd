const express=require("express")
const { logUser, getAvailableUsers, logOutUser, getUserRatings } = require("./user.controller")
const usersRoutes=express.Router()

usersRoutes.post("/login", logUser)
usersRoutes.get("/available", getAvailableUsers)
usersRoutes.post("/logout", logOutUser)
usersRoutes.post("/ratings", getUserRatings)


module.exports= usersRoutes