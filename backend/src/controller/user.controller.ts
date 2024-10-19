import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body); // Await the result of createUser
    return res.status(201).json(user); // Return created user
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message); // Send a conflict status in case of error
  }
}
