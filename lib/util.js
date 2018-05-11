'use strict'

// method to validate is object is empty
function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

module.exports = {
  isEmptyObject
}
