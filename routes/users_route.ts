import express from "express";
const router = express.Router();
import usersController from"../controllers/users_controller";

router.get("/", usersController.getAllUsers);

router.get("/:username", usersController.getUserByUsername);

router.post("/", usersController.createAUser);

router.put("/:username", usersController.updateUserEmailByUsername);

router.delete("/:username", usersController.deleteUserByUsername);

export default router;