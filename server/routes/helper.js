const errorHandler = error => {
  const errObject = {}
  if (error.response) {
    errObject.status = error.response.status
    errObject.statusText = error.response.statusText
  }
  return errObject
}

module.exports = {
  errorHandler,
}
