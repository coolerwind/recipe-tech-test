const config = require("../../../config/keys");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res
      .status(401)
      .json({ token_valid: "No token, authorizaton denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ token_valid: "Token is not valid" });
  }
}

module.exports = auth;
