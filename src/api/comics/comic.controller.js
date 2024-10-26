const Comic = require("./comic.model");
const User = require("../users/user.model");

const getComics = async (req, res) => {
  try {
    const {season}=req.params
    if (!season) {
      return res.status(400).json({ message: "Non se proporcionou a tempada" });
    }   
    const comics = await Comic.find({club_season:season}, "cover title average_rating").lean();
    if (!comics || comics.length === 0) {
      return res.status(404).json({ message: "Non se atoparon cómics" });
    }
    const formattedComics = comics.map((comic) => ({
      _id: comic._id,
      cover: comic.cover,
      title: comic.title,
      rating: comic.average_rating,
    }));

    res.json(formattedComics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getComicDetails = async (req, res) => {
  try {
    const comic = await Comic.findById(req.params.comicId);
    res.json(comic);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createComic = async (req, res) => {
  const comic = new Comic(req.body);
  try {
    const newComic = await comic.save();
    res.status(201).json(newComic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const rateComic = async (req, res) => {
  try {
    const { comicId } = req.params;
    const { userId, rating } = req.body;

    const alreadyVoted = await Comic.findOne({
      _id: comicId,
      "ratings.user_id": userId,
    });
    if (alreadyVoted)
      return res.status(400).json({ message: "Xa votaches a este cómic" });

    const comic = await Comic.findByIdAndUpdate(
      comicId,
      {
        $push: { ratings: { user_id: userId, rating: rating } },
      },
      { new: true }
    ).populate("ratings.user_id", "username");

    if (!comic) {
      return res.status(404).json({ message: "Comic non atopado" });
    }

    if (rating > 0) {
      
     comic.average_rating = calculateRating(
        
        comic.ratings
      );
    }
    await User.findByIdAndUpdate(userId, {
      $push: { rated_comics: { comic_id: comicId, rating: rating } },
    });

    await comic.save();

    res.status(201).json({
      message: "Voto engadido",
      average_rating: comic.average_rating,
      ratings: comic.ratings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRating = async (req, res) => {
  try {
    const { comicId } = req.params;
    const { userId, rating } = req.body;

    // Buscar el cómic y actualizar la valoración del usuario específico
    const comic = await Comic.findOneAndUpdate(
      { _id: comicId, "ratings.user_id": userId },
      { $set: { "ratings.$.rating": rating } },
      { new: true }
    ).populate("ratings.user_id", "username");

    if (!comic) {
      return res.status(404).json({ message: "Comic non atopado" });
    }

    
      comic.average_rating = calculateRating(
        
        comic.ratings
      );
    
    await User.findOneAndUpdate(
      { _id: userId, "rated_comics.comic_id": comicId },
      { $set: { "rated_comics.$.rating": rating } },
      { new: true }
    );
    await comic.save();

    res.status(200).json({
      message: "Voto actualizado",
      average_rating: comic.average_rating,
      ratings: comic.ratings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const calculateRating = (Ratings) => {
  const validRatings = Ratings.filter(rating => rating.rating !== 0);
  
  if (validRatings.length === 0) {
    return 0; // Retorna 0 si no hay ratings válidos
  }

  const sum = validRatings.reduce((acc, rating) => acc + rating.rating, 0);
  const averageRating = sum / validRatings.length;
  
  return parseFloat(averageRating.toFixed(1));
};
module.exports = {
  getComics,
  getComicDetails,
  createComic,
  rateComic,
  updateRating,
};
