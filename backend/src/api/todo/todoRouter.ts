import { Router } from 'express';
import { todoController } from './todoController';

export const todoRouter = Router();

todoRouter.get('/', todoController.handleGetTodos.bind(todoController));
todoRouter.post('/', todoController.handleCreateTodo.bind(todoController));
