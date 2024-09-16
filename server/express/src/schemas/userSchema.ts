// src/schemas/userSchema.ts

import { z } from 'zod';

// 사용자 등록 입력 스키마
export const RegisterInput = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6),
});

// 사용자 로그인 입력 스키마
export const LoginInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// 사용자 응답 스키마 (비밀번호 제외)
export const UserResponse = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
