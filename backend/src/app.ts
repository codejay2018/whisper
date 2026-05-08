import express from 'express';
import path from 'path';
import cors from 'cors';

import authRoute from './routes/authRoute';
import chatRoute from './routes/chatRoute';
import messageRoute from './routes/messageRoute';
import userRoute from './routes/userRoute';
import { clerkMiddleware } from '@clerk/express';
import { errorHandler } from './middleware/errorHandler';

const app = express();

const allowedOrigins = [
'http://localhost:8081',    // expo mobile
'http://localhost:5173',    // vite web dev
process.env.FRONTEND_URL!,  // production
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials:true // allow credentials from client (cookie, authorization, headers, etc.)
}));

app.use(express.json());
app.use(clerkMiddleware()); // Add Clerk middleware for authentication  

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is healthy' });
});

// 1. API 라우트 먼저 : /api/... 요청 처리
app.use("/api/auth", authRoute);
app.use("/api/chats", chatRoute);   
app.use("/api/messages", messageRoute);   
app.use("/api/users", userRoute);   
app.use(errorHandler); // Add error handling middleware

// serve frontend in production
if(process.env.NODE_ENV === 'production') {
  // 2. 그 다음 정적 파일 : JS, CSS, 이미지 등 정적 파일
  app.use(express.static(path.join(__dirname, '../../web/dist')));
  
  // 3. 마지막에 SPA 폴백 : 나머지 모든 요청 → index.html
  // Express는 위에서 아래로 순서대로 미들웨어를 실행하기 때문에 순서가 매우 중요합니다.
  app.get('/{*any}', (_, res) => {
    res.sendFile(path.join(__dirname, '../../web/dist/index.html'));
  });
}

export default app;