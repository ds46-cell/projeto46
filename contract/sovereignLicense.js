module.exports = {
  validate(entityId) {
    const licensedEntities = ['ORG-001', 'ORG-ENTERPRISE'];
    if (!licensedEntities.includes(entityId)) {
      throw new Error('INVALID_OR_EXPIRED_LICENSE');
    }
    return true;
  }
};
