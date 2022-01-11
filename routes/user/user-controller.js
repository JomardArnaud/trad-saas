import { checkUsernameValidity, checkPasswordValidity, checkEmailValidity } from '../../utils/check.js'

const checkUserValidity = (user) => {
  return checkEmailValidity(user.email) && checkPasswordValidity(user.password) && checkUsernameValidity(user.username)
}

export { checkUserValidity }
