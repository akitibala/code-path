const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const saltRounds = 10

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds)
}


const secret = 'thisisasecret'
const header = {
  typ: 'JWT',
  alg: 'HS512'
}

function generateToken(userId) {
  const data = {
    userId
  }

  return jwt.sign({ data }, secret, { expiresIn: '1h' })
}

function decodeToken(token) {
  return jwt.verify(token, secret)
}

function checkToken(token) {
  try {
    jwt.verify(token, secret)
    return true
  } catch (err) {
    return false
  }
}

module.exports = { hashPassword,generateToken, decodeToken, checkToken }
// module.exports = { hashPassword }