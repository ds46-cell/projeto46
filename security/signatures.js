import crypto from "crypto";

export function signDecision(payload, privateKey) {
  return crypto.sign("sha256", Buffer.from(JSON.stringify(payload)), privateKey);
}

export function verifySignature(payload, signature, publicKey) {
  return crypto.verify(
    "sha256",
    Buffer.from(JSON.stringify(payload)),
    publicKey,
    signature
  );
}
