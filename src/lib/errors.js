class BadRequestError extends Error {
  constructor (errors) {
    super()
    this.name = this.constructor.name
    this.errors = errors
  }
}

module.exports = {
  BadRequestError
}
