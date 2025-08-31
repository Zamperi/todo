import { hash, compare } from "bcrypt";
import jwt from 'jsonwebtoken';
const { sign } = jwt;

import { ApiError } from "../helper/ApiError.js";
import { getUserByEmail, insertUser } from "../models/User.js";
import { signAccessToken } from "../helper/auth.js";

const signUpUser = async (req, res, next) => {
  try {
    const { user } = req.body;

    if (!user || !user.email || !user.password) {
      return next(new ApiError("Email and password are required", 400));
    }

    const hashedPassword = await hash(user.password, 10);
    const result = await insertUser(user, hashedPassword);

    return res.status(201).json({ id: result.rows[0].id, email: user.email });
  } catch (err) {
    return next(err);
  }
};

const signInUser = async (req, res, next) => {
    try{
        const { user } = req.body;
        if (!user || !user.email || !user.password) {
            return next(new ApiError("Email and password are required", 400));
        }
        const email = user.email.trim().toLowerCase();

        const result = await getUserByEmail(email);
        const dbUser = result.rows[0];
        const hashToCompare = dbUser?.password ?? process.env.DUMMY_HASH;
        const isPasswordCorrect = await compare(user.password, hashToCompare);

        if (!dbUser || !isPasswordCorrect) {
          return next(new ApiError("Invalid credentials", 401));
        }
        const token = signAccessToken(dbUser);
        return res.status(200).json({ id: dbUser.id, email: dbUser.email, token });
        
    } catch(error) {
        return next(error);
    }
}

export { signUpUser, signInUser };
