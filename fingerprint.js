import os from "os";
import crypto from "crypto";

export function generateServerFingerprint() {
  const networkInterfaces = os.networkInterfaces();
  const macs = [];

  for (const name of Object.keys(networkInterfaces)) {
    for (const net of networkInterfaces[name]) {
      if (!net.internal && net.mac) {
        macs.push(net.mac);
      }
    }
  }

  const baseData = [
    os.hostname(),
    os.platform(),
    os.arch(),
    macs.sort().join(","),
  ].join("|");

  return crypto
    .createHash("sha256")
    .update(baseData)
    .digest("hex");
}