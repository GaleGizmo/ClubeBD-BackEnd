const { generateSign } = require("../../utils/jwt");
const User = require("./user.model");
const bcrypt = require("bcryptjs");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Busca al usuario por  username
    const user = await User.findOne({
      $or: [{ username: username }, { email: username }],
    });

    if (!user) {
      return res.status(401).json({ message: "Credenciais erróneas" });
    }

    // Verifica la contraseña
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciais erróneas" });
    }

    // Genera el token
    const token = generateSign(user._id, user.username);
    
    user.logged = true;
    await user.save();
    user.password = null;
    // Devuelve el token y el usuario
    return res.status(200).json({ token, user });
  } catch (error) {
    return next(error);
  }
};

const addPasswordToExistingUser = async (req, res, next) => {
  try {
    const { userId, password, username } = req.body;

    if (!userId || !password || !username) {
      return res.status(400).json({ message: "UserID, usuario e contrasinal requeridas" });
    }
    const userWithSameUsername = await User.findOne({
      username: username,
      _id: { $ne: userId },
    });
    if (userWithSameUsername) {
      console.log("Nome de usuario non dispoñible");
      return res.status(400).json({ message: "Nome de usuario non dispoñible" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const updateData = { password: hashedPassword, logged: true };

    if (username) {
      updateData.username = username;
    }

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!user) {
      return res.status(404).json({ message: "Usuario non atopado" });
    }

    return res.status(200).json({ message: "Usuario actualizado", user });
  } catch (err) {
    return next(err);
  }
};

const createUser = async (req, res) => {
  try {
    // Verifica si ya existe un usuario con el mismo  username

    if (!req.body.username) {
      return res.status(400).json({ message: "O usuario é obligatorio" });
    }
    const existingUsernameUser = await Usuario.findOne({
      username: req.body.username,
    });
    if (existingUsernameUser) {
      return res
        .status(400)
        .json({ message: "Nome de usuario non dispoñible" });
    }


    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new Usuario({
      email: req.body.email || null,
      password: hashedPassword,
      username: req.body.username,
     
    });
    
    const savedUser = await newUser.save();

    // Genera el token
    const token = generateSign(
      savedUser._id,
      savedUser.username
    );

    return res.status(201).json({ token, user: savedUser });
  } catch (error) {
    return next(error);
  }
};

const logUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (user) {
      user.logged = true;
      await user.save();
      return res.status(200).json({ message: "Usuario logado", user: user });
    } else {
      return res.status(404).json({ message: "Usuario non atopado" });
    }
  } catch (err) {
    console.log(err);
  }
};

const getAvailableUsers = async (req, res) => {
  try {
    const users = await User.find({ logged: false });
    if (!users)
      return res.status(404).json({ message: "Non hai usuarios dispoñibles" });
    return res.status(200).json({ users: users });
  } catch (err) {
    console.log(err);
  }
};

const logOutUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (user) {
      user.logged = false;
      await user.save();
      return res.status(200).json({ message: "Usuario deslogado", user: user });
    } else {
      return res.status(404).json({ message: "Usuario non atopado" });
    }
  } catch (err) {
    console.log(err);
  }
};

const getUserRatings = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (user) {
      return res.status(200).json(user.rated_comics);
    } else {
      return res.status(404).json({ message: "Usuario non atopado" });
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  logUser,
  getAvailableUsers,
  logOutUser,
  getUserRatings,
  createUser,
  login,
  addPasswordToExistingUser,
};
