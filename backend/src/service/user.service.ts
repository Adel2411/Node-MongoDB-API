import {CreateUserInput} from "../schema/user.schema";
import UserModel from "../models/user.model";
import {omit} from "lodash";

export async function createUser(input: CreateUserInput["body"]) {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

export async function validatePassword({email, password}: { email: string; password: string }) {
  const user = await UserModel.findOne({email});

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
};