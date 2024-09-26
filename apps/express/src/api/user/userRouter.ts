import { Router } from 'express';
import { UserController } from './userController';

const userController = new UserController();
export const userRouter = Router();

// userRouter.post('/register', userController.handleRegister.bind(userController));
// userRouter.post('/login', userController.handleLogin.bind(userController));
userRouter.get('/:id', userController.handleGetUser.bind(userController));