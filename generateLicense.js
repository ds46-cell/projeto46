import { readFileSync, writeFileSync } from "fs";
import { createSign } from "crypto";

const privateKey = readFileSync("private.pem", "utf8");

const licenseData = {
  serverFingerprint: "1417948cfd488bc9d1296e71300d8c3acd9298fb09f41faad82f989b6e8c6fbb",
  expiresAt: "2026-12-31T23:59:59.000Z",
  graceDays: 7
};

const sign = createSign("RSA-SHA256");
sign.update(JSON.stringify(licenseData));
sign.end();

const signature = sign.sign(privateKey, "base64");

writeFileSync(
  "license.lic",
  JSON.stringify({ data: licenseData, signature }, null, 2)
);

console.log("✅ Licença criada com sucesso!");