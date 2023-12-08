const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "secret";

const sign = (data) => jwt.sign(data, jwtSecret, { expiresIn: "1h" });

const verify = (token) => {
  let decode;
  let err;
  try {
    decode = jwt.verify(token, jwtSecret);
  } catch (error) {
    err = error;
  }
  return { decode, err };
};

const verifyMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.json({ error: "No authorization header." });

  const { decode, err } = verify(authorization);

  if (err) return res.json({ error: err });

  const { data } = user;

  if (!data) return res.json({ error: "Invalid Token." });

  res.data = data;

  return next();
};

module.exports = { sign, verifyMiddleware, verify };
