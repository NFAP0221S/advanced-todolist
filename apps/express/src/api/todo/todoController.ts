import { Request, Response, RequestHandler } from 'express';
import { TodoService } from './todoService';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

export class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  public handleGetTodos: RequestHandler = async (req: Request, res: Response) => {
    try {
      const serviceResponse = await this.todoService.getTodos();
      return handleServiceResponse(serviceResponse, res);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve todos',
        responseObject: null,
        statusCode: 500,
      });
    }
  };

  public handleCreateTodo: RequestHandler = async (req: Request, res: Response) => {
    const { title, description, userId } = req.body;
    try {
      const serviceResponse = await this.todoService.createTodo({ title, description, userId });
      return handleServiceResponse(serviceResponse, res);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create todo',
        responseObject: null,
        statusCode: 500,
      });
    }
  };
}

export const todoController = new TodoController();
