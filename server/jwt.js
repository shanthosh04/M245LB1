const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "secret";

const sign = (data) => jwt.sign(data, jwtSecret, { expiresIn: "1h" });

const verifyMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.json({ error: "No authorization header." });

  let user;
  try {
    user = jwt.verify(authorization, jwtSecret);
  } catch (err) {
    return res.json({ error: err.message });
  }

  const { data } = user;

  if (!data) return res.json({ error: "Invalid Token." });

  res.data = data;

  return next();
};

module.exports = { sign, verifyMiddleware };
