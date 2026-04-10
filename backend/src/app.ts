import express from 'express';
import authRoute from './routes/authRoute';
import chatRoute from './routes/chatRoute';
import messageRoute from './routes/messageRoute';
import userRoute from './routes/userRoute';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is healthy' });
});

app.use("/api/auth", authRoute);
app.use("/api/chats", chatRoute);   
app.use("/api/messages", messageRoute);   
app.use("/api/users", userRoute);   


export default app;