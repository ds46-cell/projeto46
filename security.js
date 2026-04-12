// SECURITY CORE - SIGOV SUPREMA

export function securityCheck(req) {
    
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    const suspicious = [
        "sqlmap",
        "nmap",
        "nikto",
        "acunetix",
        "burp",
        "scanner"
    ]

    const agent = (req.headers['user-agent'] || "").toLowerCase()

    for (let s of suspicious) {
        if (agent.includes(s)) {
            console.log("🚨 POSSÍVEL ATAQUE DETECTADO:", ip)
            return false
        }
    }

    return true
}