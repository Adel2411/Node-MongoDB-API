import User, { UserDocument } from "../models/user.model";

export async function createUser(
  input: Omit<UserDocument, "createdAt" | "updatedAt">,
) {
  try {
    return await User.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}
