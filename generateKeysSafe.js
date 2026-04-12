import { generateKeyPairSync } from "crypto";
import { writeFileSync } from "fs";

const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicExponent: 0x10001,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs1", // 👈 MUITO IMPORTANTE
    format: "pem",
  },
});

writeFileSync("public.pem", publicKey);
writeFileSync("private.pem", privateKey);

console.log("✅ Novas chaves RSA compatíveis geradas.");