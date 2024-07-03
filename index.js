require("dotenv").config();
const express = require("express");

const cors=require("cors")

const server = express();
const PORT = process.env.PORT;

server.use(cors())

server.use(express.json())
server.use(express.urlencoded({extended:true}))

const comicsRoutes=require("./src/api/comics/comic.routes.js")
const usersRoutes = require("./src/api/users/user.routes.js");
const commentsRoutes = require("./src/api/comments/comment.routes.js");
server.use("/comics",comicsRoutes)
server.use("/comments", commentsRoutes)
server.use("/users", usersRoutes)
const db=require("./src/utils/db.js");

db.connectDB()
server.use("/", (req, res) => {
  res.send("its alive!");
});
server.use((err,req,res,next)=>{
  return res.status(err.status || 500 ).json(err.message || "Error sorpresa")
})

server.use("*", (req,res,next)=>{
  const error =new Error("Route not found")
  error.status = 404
  next(error)
})


server.listen(PORT, () => {
  console.log("El server pita en http://localhost:" + PORT);
});

