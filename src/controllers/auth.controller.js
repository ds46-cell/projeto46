const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email obrigatório" });
  }

  const token = jwt.sign(
    { id: 1, email },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({ token });
};