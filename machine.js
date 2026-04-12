import os from "os"
import crypto from "crypto"

export function getMachineId(){

 const interfaces = os.networkInterfaces()

 const mac = Object.values(interfaces)
   .flat()
   .find(i => !i.internal && i.mac)

 const id = mac ? mac.mac : "unknown"

 return crypto.createHash("sha256")
   .update(id)
   .digest("hex")
}