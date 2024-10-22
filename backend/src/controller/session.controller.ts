import logger from "../utils/logger";
import { Request, Response } from "express";
import {validatePassword} from "../service/user.service";
import {createSession} from "../service/session.service";
import {UserDocument} from "../models/user.model";

export async function createUserSessionHandler(req: Request, res: Response) {
    // Validate the users password
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send("Invalid username or password");
    }

    // Create a new session
    const session = await createSession(user._id as string, req.get("user-agent") || "");

    // Create a session access token

    // Create a session refresh token

    // Return the access token and refresh token
}