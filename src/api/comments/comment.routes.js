const express=require("express")
const { validateComment,  validateUserId, validateComicId, validateCommentId } = require("../../middleware/validation")
const { addCommentToComic, getCommentsFromComic, updateComment, getCommentsFromUser, deleteComment } = require("./comment.controller")
const commentsRoutes=express.Router()

commentsRoutes.post("/:comicId",validateComicId, validateUserId, validateComment, addCommentToComic)
commentsRoutes.get("/comic/:comicId", validateComicId, getCommentsFromComic)
commentsRoutes.put("/:commentId", validateCommentId, validateUserId, validateComment, updateComment)
commentsRoutes.get("/user/comments", validateUserId, getCommentsFromUser)
commentsRoutes.delete("/:commentId", validateCommentId, validateUserId, deleteComment)

module.exports=commentsRoutes