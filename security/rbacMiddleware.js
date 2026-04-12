export default function authorize(permission) {
  return (req, res, next) => {
    // 🔓 MODO DESENVOLVIMENTO (libera tudo)
    // Depois você liga JWT / usuário real
    console.log(`RBAC check bypassed for permission: ${permission}`);
    next();
  };
}
