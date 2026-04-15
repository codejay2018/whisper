import { Server as HttpServer } from "http";
import { Socket, Server as SoketServer } from "socket.io";
import { verifyToken } from "@clerk/express";
import { User } from "../models/User";
import { Chat } from "../models/Chat";
import { Message } from "../models/Message";


// store online users in memory : userId -> socketId
export const onlineUsers: Map<string, string> = new Map();

export const initializeSocket = (httpServer: HttpServer) => {
    const allowedOrigins = [
        "http://localhost:8091",
        "http://localhost:5173", 
        process.env.FRONTEND_URL,
    ].filter((origin): origin is string => Boolean(origin));

    const io = new SoketServer(httpServer, {cors:{origin: allowedOrigins}});

    io.use( async (socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error("Authentication error: No token provided"));
        }

        try {
            const session = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY as string });
            const clerkId = session.sub;
            const user = await User.findOne({ clerkId });
            if (!user) {
                return next(new Error("Authentication error: User not found"));
            }

            socket.data.userId = user._id.toString();

            next();

        } catch (error: any) {
            console.error("Socket authentication error:", error);
            return next(new Error(error));
        }   

        io.on("connection", (socket) => {
            const userId = socket.data.userId;

            // send list currently online users to the newly connected user
            socket.emit("online-users", {userIds: Array.from(onlineUsers.keys())});

            // store user in the online users map
            onlineUsers.set(userId, socket.id);

            // notify others that this user is now online
            socket.broadcast.emit("user-online", { userId });

            socket.join(`user:${userId}`);
            
            socket.on("join-chat", (chatId:string) => {
                socket.join(`chat:${chatId}`);
            });
            
            socket.on("leave-chat", (chatId:string) => {
                socket.leave(`chat:${chatId}`);
            });

            // hnadle sending message
            socket.on("send-message", async (data: { chatId: string, text: string }) => {
                try {
                    const { chatId, text } = data;
                    const chat = await Chat.findOne({ _id: chatId, participants: userId });
                    if (!chat) {
                        return socket.emit("socket-error", { message: "Chat not found" });
                    }

                    const message = await Message.create({
                        chat: chatId,
                        sender: userId,
                        text,
                    });

                    chat.lastMessage = message._id;
                    chat.lastMessageAt = new Date();
                    await chat.save();

                    await message.populate("sender", "name email avatar");

                    // emit to chat room : for users inside the chat
                    io.to(`chat:${chatId}`).emit("new-message", message);

                    // also emit to participants personal rooms
                    for (const participantId of chat.participants) {
                        io.to(`user:${participantId}`).emit("new-message", message);
                    }
                } catch (error) {
                    console.error("Error sending message:", error);
                    socket.emit("socket-error", { message: "Failed to send message" }); 
                }
            });

            // DOTO: later
            socket.on("typing", async (data) => {});

            socket.on("disconnect", () => {
                onlineUsers.delete(userId);
                socket.broadcast.emit("user-offline", { userId });  
            });

        }); 
    });

    return io;
};