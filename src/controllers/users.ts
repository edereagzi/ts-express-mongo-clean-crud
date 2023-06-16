import { Request, Response, NextFunction } from "express";
import { BadRequest, NotFound } from "http-errors";
import { deleteUserById, getUsers, getUserById } from "../db/users";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    if (!deletedUser) {
      throw new NotFound(`User with id ${id} not found`);
    }

    return res.json(deletedUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      throw new BadRequest("Username is required");
    }

    const user = await getUserById(id);

    if (!user) {
      throw new NotFound(`User with id ${id} not found`);
    }

    user.username = username;
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
