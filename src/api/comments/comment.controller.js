const Comic = require("../comics/comic.model");
const User = require("../users/user.model");
const Comment = require("./comment.model");

const addCommentToComic = async (req, res) => {
  try {
    const { comicId } = req.params;
    const { userId, commentText } = req.body;

    // Buscar o comic por ID
    const newComment = new Comment({
      user_id: userId,
      comment_text: commentText,
      comic_id: comicId,
    });

    await newComment.save();

    await Comic.findByIdAndUpdate(
      comicId,
      { $inc: { comments_count: 1 } }, // Incrementar commentsCount en 1
      { new: true }
    );
    await User.findByIdAndUpdate(
      userId,
      { $inc: { comments_count: 1 } }, // Sumar a los comentarios del usuario
      { new: true }
    );

    res
      .status(201)
      .json({
        message: "Comentario engadido",
        comment: newComment.comment_text,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCommentsFromComic = async (req, res) => {
  try {
    const { comicId } = req.params;
    const comments = await Comment.find({ comic_id: comicId }).populate('user_id', 'username') // Aquí hacemos el populate
    .lean(); // Usamos lean() para obtener objetos JavaScript planos

  // Transformamos el resultado para tener una estructura más clara
  const formattedComments = comments.map(comment => ({
    _id: comment._id,
    comment_text: comment.comment_text,
    created_at: comment.created_at,
    username: comment.user_id.username // Extraemos el username
  }));

  res.status(200).json({ comments: formattedComments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, commentText } = req.body;

    // Buscar el cómic y actualizar el comentario del usuario específico
    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, user_id: userId },
      { $set: { comment_text: commentText } },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({ message: "Comentario non atopado" });
    }

    res
      .status(200)
      .json({
        message: "Comentario actualizado",
        comment: comment.comment_text,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getCommentsFromUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const comments = await Comment.find({ user_id: userId });
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.body;

    // Buscar el cómic y eliminar el comentario del usuario específico
    const comment = await Comment.findOneAndDelete({
      _id: commentId,
      user_id: userId,
    });

    if (!comment) {
      return res.status(404).json({ message: "Comentario non atopado" });
    }
    await Comic.findByIdAndUpdate(
      comment.comic_id,
      { $inc: { comments_count: -1 } }, // Decrementar commentsCount en 1
      { new: true }
    );
    await User.findByIdAndUpdate(
      userId,
      { $inc: { comments_count: -1 } }, // Restar a los comentarios del usuario
      { new: true }
    );
    res.status(200).json({ message: "Comentario eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addCommentToComic,
  getCommentsFromComic,
  getCommentsFromUser,
  updateComment,
  deleteComment,
};
