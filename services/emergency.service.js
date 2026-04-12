let emergency = false;
let activatedBy = null;

export function activateEmergency(user) {
  emergency = true;
  activatedBy = user;
}

export function emergencyStatus() {
  return { emergency, activatedBy };
}
