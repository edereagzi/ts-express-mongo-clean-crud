import { Request, Response, NextFunction } from "express";
import { merge, get } from "lodash";
import { Forbidden, NotFound, Unauthorized } from "http-errors";

import { getUserBySessionToken } from "../db/users";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.cookies["AUTH_TOKEN"];

    if (!sessionToken) {
      throw new Unauthorized("Auth token is missing");
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      throw new Unauthorized("User not found");
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    next(error);
  }
};

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
      throw new NotFound("Current user not found");
    }

    if (currentUserId.toString() !== id) {
      throw new Forbidden("Current user is not the owner");
    }

    next();
  } catch (error) {
    next(error);
  }
};

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500);

  res.json({
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
}
