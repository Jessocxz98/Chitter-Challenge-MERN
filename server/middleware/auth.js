const jwt = require('jsonwebtoken');

module.exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Cookie').replace('jwt=', '');
    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decodedData?._id;
    }
    next();
  }
  catch (err) {
    console.log(err)
  }
}
