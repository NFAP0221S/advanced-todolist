// src/common/utils/logger.ts

import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

// Winston 로거 설정
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    // 콘솔 출력 (개발 환경에 유용)
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    }),
    // 파일로 로그 저장 (운영 환경에 유용)
    new transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ],
  exitOnError: false
});

export default logger;
