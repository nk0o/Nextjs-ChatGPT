import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env' });

export default defineConfig({
  dialect: "postgresql",//db 종류
  schema: "./db/schema.ts", //테이블을 선언한 schema파일 경로
  out: "./drizzle", //마이그레이션 파일이 생성될 폴더 경로
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
