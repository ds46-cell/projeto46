exports.secureData = (req, res) => {
  res.json({
    message: "Sistema protegido funcionando",
    user: req.user
  });
};