import type { AuthRequest } from "../middleware/auth";
import type { Request, Response } from "express";
import { User } from "../models/User";
import { clerkClient, getAuth } from "@clerk/express";

export async function getMe(req:AuthRequest, res:Response, next:Function) {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized - user ID missing" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error in getMe controller:", error);
        res.status(500);
        next(error);
    }
}

export async function authCallback(req:Request, res:Response, next:Function) {
    try {
        const {userId:clerkId} = getAuth(req);
        if(!clerkId) {
            return res.status(401).json({ message: "Unauthorized - invalid token" });
        }
    
        let user = await User.findOne({ clerkId });
        if (!user) {
            const clerkUser = await clerkClient.users.getUser(clerkId);
            const primaryEmail = clerkUser.emailAddresses[0]?.emailAddress;
            if (!primaryEmail) {
                return res.status(400).json({ message: "Unable to sync user: no email on Clerk profile" });
            }

            user = await User.create({
                clerkId,
                name: clerkUser.firstName
                ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
                : primaryEmail.split("@")[0],
                email: primaryEmail,
                avatar: clerkUser.imageUrl ,
            }); 
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error in authCallback controller:", error);
        res.status(500);
        next(error);
    }
}