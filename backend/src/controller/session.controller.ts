import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {createSession, findSessions, updateSession} from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import dotenv from "dotenv";

dotenv.config();

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the users password
  const user = await validatePassword(req.body);

  if (!user) {
    res.status(401).send("Invalid username or password");
  } else {
    // Create a new session
    const session = await createSession(
      user._id as string,
      req.get("user-agent") || "",
    );

    // Create a session access token
    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: process.env.ACCESS_TOKEN_TTL },
    );

    // Create a session refresh token
    const refreshToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: process.env.REFRESH_TOKEN_TTL },
    );

    // Return the access token and refresh token
    res.send({ accessToken, refreshToken });
  }
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  res.send(sessions);
}

export async function deleteUserSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

    await updateSession({ _id: sessionId }, { valid: false });

    console.log("Session deleted: ", sessionId);

  res.send({
    accessToken: null,
    refreshToken: null,
  });
}