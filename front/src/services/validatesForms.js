export function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

export function isValidPassword(password) {
  return password.length > 7;
}

export function arePasswordsMatching(password, confirmPassword) {
  return password === confirmPassword;
}

export function validadeName(name) {
  return name.length > 2 ? true : false;
}

export const registerInfosValidate = (email, password, confirmPassword, name) => {
  return isValidEmail(email) && isValidPassword(password) && arePasswordsMatching(password, confirmPassword) && validadeName(name);
};

export const loginInfosValidate = (email, password) => {
  return isValidEmail(email) && isValidPassword(password);
};