import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { Chat } from "../models/Chat";
import { Types } from "mongoose";

export async function getChats(req:AuthRequest, res:Response, next:NextFunction) {
    try {
        const userId = req.userId;
        const chat = await Chat.find({ participants: userId })
            .populate("participants", "name email avatar")
            .populate("lastMessage")
            .sort({ lastMessageAt: -1 });
        
        const formmattedChats = chat.map((chat) => {
            const otherParticipant = chat.participants.find((p) => p._id.toString() !== userId);
            return {
              _id: chat._id,
              participant: otherParticipant,
              lastMessage: chat.lastMessage,
              lastMessageAt: chat.lastMessageAt,
              createdAt: chat.createdAt,
            };
        });

        res.json(formmattedChats);

    } catch (error) {
        res.status(500);
        next(error);
    }
}

export async function getOrCreateChat(req:AuthRequest, res:Response, next:NextFunction) {
    try {
        const userId = req.userId;
        const participantId = req.params.participantId;

        if(!participantId || typeof participantId !== "string") {
            return res.status(400).json({ message: "Participant ID is required" });
        }

        if(!Types.ObjectId.isValid(participantId)) {
            return res.status(400).json({ message: "Invalid participant ID" });
        }
        
        if(participantId === userId) {
            return res.status(400).json({ message: "Cannot create chat with yourself" });
        }

        let chat = await Chat.findOne({ 
            participants: { $all: [userId, participantId] } 
        }).populate("participants", "name email avatar")
          .populate("lastMessage");

        if (!chat) {
            chat = new Chat({
                participants: [userId, participantId],
            });
            await chat.save();
            chat = await chat.populate("participants", "name email avatar");
        }

        const otherParticipant = chat.participants.find((p) => p._id.toString() !== userId);
        const formattedChat = {
            _id: chat._id,
            participant: otherParticipant ?? null,
            lastMessage: chat.lastMessage,
            lastMessageAt: chat.lastMessageAt,
            createdAt: chat.createdAt,
        };

        res.json(formattedChat);

    } catch (error) {
        res.status(500);
        next(error);
    }
}
