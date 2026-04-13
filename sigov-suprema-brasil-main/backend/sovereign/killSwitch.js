// backend/sovereign/killSwitch.js
let systemActive = true;

module.exports.assertSystemActive = function() {
    if (!systemActive) throw new Error('SYSTEM_INACTIVE');
};

module.exports.deactivateSystem = function() {
    systemActive = false;
};

module.exports.activateSystem = function() {
    systemActive = true;
};
