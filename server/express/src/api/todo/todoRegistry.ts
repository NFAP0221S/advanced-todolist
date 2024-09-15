// src/api/todo/todoRegistry.ts

import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

// 투두리스트 아이템 스키마 정의
const todoItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean().default(false),
});

// 레지스트리 생성 및 스키마 등록
export const todoRegistry = new OpenAPIRegistry();

todoRegistry.register("TodoItem", todoItemSchema);
// todoRegistry.register("TodoItem", todoItemSchema, {
//   description: "A single todo item",
// });

// 추가적인 API 엔드포인트와 스키마 등록 가능
