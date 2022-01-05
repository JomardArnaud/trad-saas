
export function checkUserValidity (user) {
  return checkEmailValidity(user.email) && checkPasswordValidity(user.password) && checkUsernameValidity(user.username)
}

export function checkUsernameValidity (username) {
  if (!username || typeof username !== 'string') {
    return false
  }
  return true
}

export function checkPasswordValidity (password) {
  if (!password || typeof password !== 'string') {
    return false
  }
  return true
}

export function checkEmailValidity (email) {
  if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.exec(email)) {
    return true
  } else {
    return (false)
  }
}

export function generateRandomEremento () {
  let randomString = ''
  const listValidCharacter = '&é(-è_çà)=+°1234567890AZERTYUIOPQSDFGHJKLMWXCVBNazertyuiopqsdfghjklmwxcvbn*$'
  for (let i = 0; i < 8; i++) {
    randomString += listValidCharacter.charAt(Math.floor(Math.random() * listValidCharacter.length))
  }
  return randomString
}
