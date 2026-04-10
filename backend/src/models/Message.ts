import { Schema, type Document } from "mongoose";
import mongoose from "mongoose";

export interface IChat extends Document {
    chat: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    text: string;
    createdAt: Date;
    updatedAt: Date;
};

const MessageSchema = new Schema<IChat>(
    {
        chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
        sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String, required: true, trim: true },
    },
    {
        timestamps: true,
    }
);

MessageSchema.index({ chat: 1, createdAt: 1 });
// asc 1, desc -1

export const Message = mongoose.model<IChat>("Message", MessageSchema);