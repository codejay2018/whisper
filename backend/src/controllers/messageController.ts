import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { Chat } from "../models/Chat";
import { Message } from "../models/Message";

export async function getMessages(req:AuthRequest, res:Response, next:NextFunction) {
    try {
        const userId = req.userId; // Access the userId from the request
        const chatId = req.params.chatId; // Access the chatId from the request parameters

        const chat = await Chat.findOne({ _id: chatId, participants: userId });
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        const messages = await Message.find({ chat: chatId })
            .populate("sender", "name email avatar") // Populate sender details
            .sort({ createdAt: 1 }); // oldest first
        res.json(messages);

    } catch (error) {
        res.status(500);
        next(error);
    }
};