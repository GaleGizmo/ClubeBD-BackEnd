const express=require("express")
const { validateComment,  validateUserId, validateComicId, validateCommentId } = require("../../middleware/validation")
const { addCommentToComic, getCommentsFromComic, updateComment, getCommentsFromUser, deleteComment } = require("./comment.controller")
const { authenticateUser } = require("../../middleware/auth")
const commentsRoutes=express.Router()

commentsRoutes.post("/:comicId", authenticateUser, validateComicId,  validateComment, addCommentToComic)
commentsRoutes.get("/comic/:comicId", validateComicId, getCommentsFromComic)
commentsRoutes.put("/:commentId", validateCommentId, authenticateUser, validateComment, updateComment)
commentsRoutes.get("/user/comments", authenticateUser, getCommentsFromUser)
commentsRoutes.delete("/:commentId", validateCommentId, authenticateUser, deleteComment)

module.exports=commentsRoutes