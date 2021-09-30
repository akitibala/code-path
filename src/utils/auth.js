const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const saltRounds = 10

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds)
}


const secret = 'thisisasecret'
// const header = {
//   typ: 'JWT',
//   alg: 'HS512'
// }

function generateToken(userId) {
  const data = {
    userId
  }

  return jwt.sign({ data }, secret, { expiresIn: '1h' })
}

// function decodeToken(token) {
//   return jwt.verify(token, secret)
// }

// function checkToken(token) {
//   try {
//     jwt.verify(token, secret)
//     return true
//   } catch (err) {
//     return false
//   }
// }
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  // console.log(token)

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, secret, (err, user) => {
    // console.log(err)

    if (err) return res.send('Invalid Token').status(403)
    console.log(user.data)

    req.userId = user.data.userId

    return next()
  })
}
module.exports = { hashPassword,generateToken,authenticateToken}
  //  decodeToken, checkToken }
// module.exports = { hashPassword }