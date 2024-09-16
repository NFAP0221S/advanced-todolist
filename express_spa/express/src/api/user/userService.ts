// src/api/user/userService.ts

import { PrismaClient, User } from '@prisma/client';
import { ServiceResponse } from '../../common/models/serviceResponse';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

export class UserService {
  /**
   * 사용자 정보 조회 서비스
   * @param userId 사용자 ID
   * @returns ServiceResponse 객체
   */
  public async getUserById(
    userId: number
  ): Promise<ServiceResponse<Omit<User, 'password'> | null>> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        return ServiceResponse.failure('User not found', null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success('User retrieved successfully', user, StatusCodes.OK);
    } catch (error) {
      console.error(error);
      return ServiceResponse.failure('Failed to retrieve user', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const userService = new UserService();
