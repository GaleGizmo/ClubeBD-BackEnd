const jwt = require("jsonwebtoken");

const generateSign = (id, username) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRET);
};

const verifyJwt = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        reject(err);
      } else {
        resolve(decodedToken);
      }
    });
  });
};

// const generateTempToken = (id)=>{
//   return jwt.sign({id}, process.env.JWT_SECRET, {
//     expiresIn: "1h",
//   })
// }
module.exports = { generateSign, verifyJwt };
