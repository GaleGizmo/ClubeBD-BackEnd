
const User = require('../api/users/user.model');
const { verifyJwt } = require('../utils/jwt');



const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Debes estar logueado, rapaz" });
    }
    const parsedToken = token.replace("Bearer ", "");
    try {
      const validToken = await verifyJwt(parsedToken);
      const userLogued = await User.findById(validToken.id).select("-password");
      if (!userLogued) {
        return res.status(401).json({ message: "Usuario non atopado" });
      }
      req.user = userLogued;
      next();
    } catch (err) {
      next(err); // Pasar el error al siguiente middleware
    }
};

module.exports = { authenticateUser };