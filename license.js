export function validateLicense(key) {
  if (!key || key.length < 10) {
    return { valid: false };
  }

  return { valid: true };
}