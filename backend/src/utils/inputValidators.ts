import validator from "validator";

export const validateEmail = (email: string): boolean =>
  validator.isEmail(email);

export const validatePassword = (password: string): boolean =>
  validator.isLength(password, { min: 5 });
