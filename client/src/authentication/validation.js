import Validator from 'validator';

export const ValidUsername = (username) => {
  let valid = true;
  if (username.length < 4) return 'Username must be at least 4 characters';
  if (username.length > 15) return 'Username must not have more than 15 characters';
  return valid;
}

export const ValidEmail = (email) => {
  let valid = true;
  if (!Validator.isEmail(email)) return 'Please enter a valid email';
  return valid;
}

export const ValidPassword = (password, passwordToMatch) => {
  let valid = true;
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (password !== passwordToMatch) return 'Passwords do not match';
  return valid;
}