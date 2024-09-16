// src/common/middleware/requestLogger.ts

import { Request, Response, NextFunction } from "express";
import logger from "@/common/utils/logger";

// 요청 및 응답 로깅 미들웨어
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // 요청이 완료된 후 실행되는 이벤트 리스너
  res.on("finish", () => {
    const duration = Date.now() - start;
    const { method, originalUrl } = req;
    const { statusCode } = res;

    // Winston을 사용하여 로그 기록
    logger.info(`${method} ${originalUrl} ${statusCode} ${duration}ms`, {
      method,
      originalUrl,
      statusCode,
      duration
    });
  });

  next();
};

export default requestLogger;
