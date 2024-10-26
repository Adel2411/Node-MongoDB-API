import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the users password
  const user = await validatePassword(req.body);

  if (!user) {
    res.status(401).send("Invalid username or password");
  } else {
    const session = await createSession(
      user._id as string,
      req.get("user-agent") || "",
    );

    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get<string>("accessTokenTtl") },
    );

    const refreshToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get<string>("refreshTokenTtl") },
    );

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
