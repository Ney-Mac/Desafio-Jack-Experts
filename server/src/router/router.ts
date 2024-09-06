import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController";
import { TaskController } from "../controllers/TaskController";
import { authMidleware } from "../middlewares/authMidleware";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'OK' });
});

// User routes
router.post('/login', UserController.login);
router.post('/register', UserController.register);

//Task routes
router.post('/create-task', authMidleware, TaskController.create);

export default router;