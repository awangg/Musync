const config = require('../../config')
const moment = require('moment');
const jwt = require('jwt-simple');

const { user } = require('../models/index')

const verifyAuth = (req, res, next) => {
  if(!req.headers.authorization) {
    console.log('a')
    return res.status(401).json({ error: 'Token Missing' })
  }
  let token = req.headers.authorization.split(' ')[1]
  
  let payload = null
  try {
    payload = jwt.decode(token, config.auth.secret)
  } catch (err) {
    console.log('s')
    return res.status(401).json({ error: 'Token Invalid' })
  }

  if(payload.exp <= moment().unix()) {
    console.log('d')
    return res.status(401).json({ error: 'Token Expired' })
  }

  user.findById(payload.sub, function(err, user) {
    console.log('f')
    if(!user) return res.status(404).json({ error: 'Person Not Found' })
    req.user = payload.sub
    next()
  })
}

module.exports = {
  verifyAuth: verifyAuth
}