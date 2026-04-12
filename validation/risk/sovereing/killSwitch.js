let SYSTEM_ACTIVE = true

module.exports = {
  assertSystemActive() {
    if (!SYSTEM_ACTIVE) {
      throw new Error('SYSTEM_HALTED_BY_AUTHORITY')
    }
  },
  deactivate() {
    SYSTEM_ACTIVE = false
  },
  activate() {
    SYSTEM_ACTIVE = true
  }
}
