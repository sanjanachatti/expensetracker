const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const jwt = require("jsonwebtoken");
exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("authHeader", authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      // console.log("-----------",user);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
