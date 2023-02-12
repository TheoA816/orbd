import { getUserByEmail, getUserByUsername, registerUser, updateToken } from './db';
import crypto from "crypto";
import jwt from 'jsonwebtoken';

export {
  register,
  login
}

const register = async (username: string, email: string, password: string) => {

  // Check if email already used
  let user = await getUserByEmail(email);
  if (user !== null) {
    return { error: "This email has already been used with another account." };
  }

  // Check if username already taken
  user = await getUserByUsername(username);
  if (user !== null) {
    return { error: "Username has been taken" };
  }

  // Get salt
  let salt = crypto.randomBytes(16).toString("hex");

  // Initialise hash object
  let hash = crypto.createHmac("sha512", salt);

  // Combine password into hash
  hash.update(password);

  // Convert hash object to string
  let hashed = hash.digest("hex");

  const refreshToken = jwt.sign(
    { email: email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "3d" }
  );
  
  // register user
  await registerUser(username, email, hashed, salt, refreshToken);
  return { refreshToken: refreshToken };
}

const login = async (email: string, password: string) => {

  // user does not exist throw error
  let user = await getUserByEmail(email);
  if (user === null) {
    return { error: "The email provided is not associated with any account" };
  }

  // Get salt
  let salt = user.salt;

  // Initialise hash object
  let hash = crypto.createHmac("sha512", salt);

  // Combine password into hash
  hash.update(password);

  // Convert hash object to string
  let hashed = hash.digest("hex");

  if (hashed !== user.password) {
    return { error: "Incorrect password!" };
  }

  const refreshToken = jwt.sign(
    { email: email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "3d" }
  );

  await updateToken(refreshToken, email);
  return { refreshToken: refreshToken };
}