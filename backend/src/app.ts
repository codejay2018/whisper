import express from 'express';
import authRoute from './routes/authRoute';
import chatRoute from './routes/chatRoute';
import messageRoute from './routes/messageRoute';
import userRoute from './routes/userRoute';
import { clerkMiddleware } from '@clerk/express';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use(clerkMiddleware()); // Add Clerk middleware for authentication  

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is healthy' });
});

app.use("/api/auth", authRoute);
app.use("/api/chats", chatRoute);   
app.use("/api/messages", messageRoute);   
app.use("/api/users", userRoute);   
app.use(errorHandler); // Add error handling middleware

export default app;