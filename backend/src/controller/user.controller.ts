import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";
import { omit } from "lodash";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response,
) {
  try {
    const user = await createUser(req.body); // Await the result of createUser
    res.status(201).json(omit(user.toJSON(), "password")); // Return created user
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e.message); // Send a conflict status in case of error
  }
}
