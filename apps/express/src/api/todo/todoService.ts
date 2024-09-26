import { PrismaClient, Todo } from '@prisma/client';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

export class TodoService {
  public async getTodos(): Promise<ServiceResponse<Todo[] | null>> {
    try {
      const todos = await prisma.todo.findMany();
      return ServiceResponse.success('Todos retrieved successfully', todos, StatusCodes.OK);
    } catch (error) {
      console.error(error);
      return ServiceResponse.failure('Failed to retrieve todos', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public async createTodo(data: { title: string; description: string; userId: number }): Promise<ServiceResponse<Todo | null>> {
    try {
      const todo = await prisma.todo.create({
        data: {
          title: data.title,
          description: data.description,
          userId: data.userId ?? null, // 선택적 필드인 경우 null로 설정
        },
      });
      return ServiceResponse.success('Todo created successfully', todo, StatusCodes.CREATED);
    } catch (error) {
      console.error(error);
      return ServiceResponse.failure('Failed to create todo', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
