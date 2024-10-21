import User, { UserDocument } from "../models/user.model";

export async function createUser(input: {
  name: string;
  password: string;
  email: string;
}) {
  try {
    return await User.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}
