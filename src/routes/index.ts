import { Router } from "express";
import authentication from "./authentication";
import users from "./users";

const router = Router();

router.use("/auth", authentication);
router.use("/users", users);

export default router;
