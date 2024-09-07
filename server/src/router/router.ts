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

router.patch('/edit-task', authMidleware, TaskController.editBadRequest);
router.patch('/edit-task/:id', authMidleware, TaskController.edit);

router.get('/get-task', authMidleware, TaskController.getTask);

router.patch('/task/:id/completed', authMidleware, TaskController.complete);

router.delete('/delete-task/:id', authMidleware, TaskController.delet);

export default router;