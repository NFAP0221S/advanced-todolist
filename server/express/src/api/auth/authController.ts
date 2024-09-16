import { Request, Response, RequestHandler } from 'express';
import { AuthService } from './authService';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public handleLogin: RequestHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const serviceResponse = await this.authService.loginUser(email, password);
      return handleServiceResponse(serviceResponse, res);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Login failed',
        responseObject: null,
        statusCode: 500,
      });
    }
  };

  public handleRegister: RequestHandler = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
      const serviceResponse = await this.authService.registerUser(username, email, password);
      return handleServiceResponse(serviceResponse, res);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Registration failed',
        responseObject: null,
        statusCode: 500,
      });
    }
  };
}

export const authController = new AuthController();
