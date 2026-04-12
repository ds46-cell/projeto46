const jwt = require("jsonwebtoken");

const users = []; // depois vamos colocar no banco

exports.register = (req, res) => {
  const { email, password } = req.body;

  const user = { id: Date.now(), email, password };
  users.push(user);

  res.json({ message: "Usuário criado" });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
};