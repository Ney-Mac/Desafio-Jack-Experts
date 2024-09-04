import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'OK' });
});

// User routes
router.post('/login', UserController.login);
router.post('/register', UserController.register);

export default router;