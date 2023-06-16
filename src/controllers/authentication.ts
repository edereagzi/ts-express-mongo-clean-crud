import { Request, Response, NextFunction } from "express";
import { BadRequest, Unauthorized, Conflict } from "http-errors";
import { getUserByEmail, createUser } from "../db/users";
import { authentication, random } from "../helpers";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequest("Email and password are required");
    }

    const user = await getUserByEmail(email).select("+authentication.salt +authentication.password");

    if (!user) {
      throw new Unauthorized("User not found");
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      throw new Unauthorized("Password is incorrect");
    }

    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    res.cookie("AUTH_TOKEN", user.authentication.sessionToken, { domain: "localhost", path: "/", httpOnly: true });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      throw new BadRequest("Email, password and username are required");
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw new Conflict("User already exists");
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
