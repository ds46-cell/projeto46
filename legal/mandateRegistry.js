const mandates = new Map()

module.exports.registerMandate = (entity, scope) => {
  mandates.set(entity, scope)
}

module.exports.validateMandate = (entity, action) => {
  return mandates.has(entity) && mandates.get(entity).includes(action)
}
