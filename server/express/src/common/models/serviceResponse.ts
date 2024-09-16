// src/common/models/serviceResponse.ts

import { StatusCodes } from "http-status-codes";
import { z } from "zod";

/**
 * ServiceResponse 클래스는 API 응답의 일관성을 유지하기 위해 사용됩니다.
 * 제네릭 타입 <T>를 사용하여 다양한 형태의 응답 데이터를 지원합니다.
 */
export class ServiceResponse<T = null> {
  readonly success: boolean;
  readonly message: string;
  readonly responseObject: T | null; // responseObject가 null일 수도 있음을 반영
  readonly statusCode: number;

  private constructor(success: boolean, message: string, responseObject: T | null, statusCode: number) {
    this.success = success;
    this.message = message;
    this.responseObject = responseObject;
    this.statusCode = statusCode;
  }

  /**
   * 성공 응답을 생성합니다.
   * @param message - 성공 메시지
   * @param responseObject - 응답 데이터
   * @param statusCode - HTTP 상태 코드 (기본값: 200 OK)
   */
  static success<T>(message: string, responseObject: T, statusCode: number = StatusCodes.OK) {
    return new ServiceResponse(true, message, responseObject, statusCode);
  }

  /**
   * 실패 응답을 생성합니다.
   * @param message - 실패 메시지
   * @param responseObject - 응답 데이터 (선택적)
   * @param statusCode - HTTP 상태 코드 (기본값: 400 Bad Request)
   */
  static failure<T>(message: string, responseObject: T | null = null, statusCode: number = StatusCodes.BAD_REQUEST) {
    return new ServiceResponse(false, message, responseObject, statusCode);
  }
}

/**
 * ServiceResponseSchema는 ServiceResponse 객체의 유효성을 검증하기 위한 Zod 스키마를 생성합니다.
 * @param dataSchema - responseObject의 Zod 스키마
 * @returns Zod 스키마 객체
 */
export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    responseObject: dataSchema.optional().nullable(), // responseObject가 선택적이며 null일 수 있음을 반영
    statusCode: z.number(),
  });
