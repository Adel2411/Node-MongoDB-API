import logger from "../utils/logger";
import { Request, Response } from "express";
import {validatePassword} from "../service/user.service";
import {createSession} from "../service/session.service";
import {UserDocument} from "../models/user.model";
import {signJwt} from "../utils/jwt.utils";
import config from "config";

export async function createUserSessionHandler(req: Request, res: Response) {
    // Validate the users password
    const user = await validatePassword(req.body);

    if (!user) {
        res.status(401).send("Invalid username or password");
    } else {
        // Create a new session
        const session = await createSession(user._id as string, req.get("user-agent") || "");

        // Create a session access token
        const accessToken = signJwt({...user, session: session._id} , {expiresIn: config.get("accessTokenTtl")});

        // Create a session refresh token
        const refreshToken = signJwt({...user, session: session._id} , {expiresIn: config.get("refreshTokenTtl")});

        // Return the access token and refresh token
        res.send({accessToken, refreshToken});
    }

}