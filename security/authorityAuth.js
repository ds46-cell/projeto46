function verifyAuthorityToken(token) {
  if (!token || token !== "SIGOV_ROOT") {
    throw new Error("Unauthorized authority token");
  }
  return true;
}

module.exports = { verifyAuthorityToken };
