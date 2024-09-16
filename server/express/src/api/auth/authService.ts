import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { env } from '@/config/envConfig';
import { ServiceResponse } from '@/common/models/serviceResponse';

const prisma = new PrismaClient();
const JWT_SECRET = env.JWT_SECRET || 'your_jwt_secret';

export class AuthService {
  public async loginUser(email: string, password: string): Promise<ServiceResponse<{ token: string } | null>> {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return ServiceResponse.failure('Invalid credentials', null, StatusCodes.BAD_REQUEST);
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return ServiceResponse.failure('Invalid credentials', null, StatusCodes.BAD_REQUEST);
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
      return ServiceResponse.success('Login successful', { token }, StatusCodes.OK);
    } catch (error) {
      console.error(error);
      return ServiceResponse.failure('Login failed', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public async registerUser(username: string, email: string, password: string): Promise<ServiceResponse<Omit<User, 'password'> | null>> {
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return ServiceResponse.failure('Email already in use', null, StatusCodes.BAD_REQUEST);
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { username, email, password: hashedPassword },
      });

      const { password: _, ...userData } = user;
      return ServiceResponse.success('User registered successfully', userData, StatusCodes.CREATED);
    } catch (error) {
      console.error(error);
      return ServiceResponse.failure('Registration failed', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
