import User from "../models/user.model";
import {CreateUserInput} from "../schema/user.schema";

export async function createUser(input: CreateUserInput["body"]) {
  try {
    return await User.create(input);
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}