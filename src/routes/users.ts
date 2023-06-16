import express from "express";

import { getAllUsers, deleteUser, updateUser } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";

const router = express.Router();

router.get("/", isAuthenticated, getAllUsers);
router.delete("/:id", isAuthenticated, isOwner, deleteUser);
router.patch("/:id", isAuthenticated, isOwner, updateUser);

export default router;
