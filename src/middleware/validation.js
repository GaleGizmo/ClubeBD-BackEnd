const validateUserId = (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Precisa de un usuario" });
  }

  next();
};



const validateComicId = (req, res, next) => {
  const { comicId } = req.params;

  if (!comicId) {
    return res.status(400).json({ message: "Precisa de un comic" });
  }

  next();
};

const validateCommentId = (req, res, next) => {
  const { commentId } = req.params;

  if (!commentId) {
    return res.status(400).json({ message: "Precisa de un comentario" });
  }

  next();
};
const validateRating = (req, res, next) => {
  const { rating } = req.body;

  if (rating == null || rating < 0 || rating > 10) {
    return res.status(400).json({ message: "Datos de voto inválidos" });
  }

  next();
};

const validateComment = (req, res, next) => {
  const { commentText } = req.body;

  if (!commentText || commentText.trim().length === 0) {
    return res.status(400).json({ message: "O comentario debe ter contido" });
  }

  next();
};

module.exports = {
  validateUserId,
  validateRating,
  validateComment,
  validateComicId,
  validateCommentId,
};
