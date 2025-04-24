const express=require("express")
const { logUser, getAvailableUsers, logOutUser, getUserRatings, createUser, login, addPasswordToExistingUser } = require("./user.controller")
const usersRoutes=express.Router()

usersRoutes.post("/userlogin", logUser)
usersRoutes.get("/available", getAvailableUsers)
usersRoutes.post("/logout", logOutUser)
usersRoutes.post("/ratings", getUserRatings)
usersRoutes.post("/create", createUser)
usersRoutes.post("/login", login)
usersRoutes.patch("/updateuser", addPasswordToExistingUser)


module.exports= usersRoutes