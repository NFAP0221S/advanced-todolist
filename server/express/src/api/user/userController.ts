import { Request, Response, RequestHandler } from 'express';
import { UserService } from './userService';
import { handleServiceResponse } from '@/common/utils/httpHandlers';
import { StatusCodes } from 'http-status-codes';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * 사용자 등록 핸들러
   */
  // public handleRegister: RequestHandler = async (req: Request, res: Response) => {
  //   const { username, email, password } = req.body;
  //   try {
  //     const serviceResponse = await this.userService.registerUser(username, email, password);
  //     return handleServiceResponse(serviceResponse, res);
  //   } catch (error) {
  //     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //       success: false,
  //       message: 'Registration failed',
  //       responseObject: null,
  //       statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  //     });
  //   }
  // };

  /**
   * 사용자 로그인 핸들러
   */
  // public handleLogin: RequestHandler = async (req: Request, res: Response) => {
  //   const { email, password } = req.body;
  //   try {
  //     const serviceResponse = await this.userService.loginUser(email, password);
  //     return handleServiceResponse(serviceResponse, res);
  //   } catch (error) {
  //     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //       success: false,
  //       message: 'Login failed',
  //       responseObject: null,
  //       statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  //     });
  //   }
  // };

  /**
   * 사용자 정보 조회 핸들러
   */
  public handleGetUser: RequestHandler = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Invalid user ID',
        responseObject: null,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }

    try {
      const serviceResponse = await this.userService.getUserById(userId);
      return handleServiceResponse(serviceResponse, res);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to retrieve user',
        responseObject: null,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  };
}

export const userController = new UserController();
