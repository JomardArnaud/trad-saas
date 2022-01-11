import jwt from 'jsonwebtoken'

const checkUsernameValidity = (username) => {
  if (!username || typeof username !== 'string') {
    return false
  }
  return true
}

const checkPasswordValidity = (password) => {
  if (!password || typeof password !== 'string') {
    return false
  }
  return true
}

const checkEmailValidity = (email) => {
  if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.exec(email)) {
    return true
  } else {
    return (false)
  }
}

const checkToken = async (token) => {
  console.log('token = ' + token)
  if (!token) return false
  jwt.verify(token, process.env.JWT_SECRET, async (err, succ) => {
    if (err) {
      console.log(`error on token${err}`)
      return false
    } else {
      console.log(succ)
      return true
    }
  })
}
export { checkUsernameValidity, checkPasswordValidity, checkEmailValidity, checkToken }
