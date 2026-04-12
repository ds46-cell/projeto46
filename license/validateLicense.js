const VALID_LICENSES = [
    {
        key: "SIGOV-KUWAIT-001",
        client: "Kuwait Gov Pilot",
        status: "active"
    }
];

export function validateLicense(key) {
    if (!key) {
        return { valid: false, reason: "NO_KEY" };
    }

    const license = VALID_LICENSES.find(l => l.key === key);

    if (!license) {
        return { valid: false, reason: "NOT_FOUND" };
    }

    if (license.status !== "active") {
        return { valid: false, reason: "INACTIVE" };
    }

    return {
        valid: true,
        client: license.client
    };
}
