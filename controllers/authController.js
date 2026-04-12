const supabase = require("../config/supabase");
const { generateToken } = require("../services/auth.service");

exports.login = async (req, res) => {
  const { email } = req.body;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data) {
    return res.status(401).json({ error: "Usuário não encontrado" });
  }

  const token = generateToken(data);

  res.json({ token });
};