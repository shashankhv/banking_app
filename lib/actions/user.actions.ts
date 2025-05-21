"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();

    const response = await account.createEmailPasswordSession(email, password);
    cookies().set("shaz-session", response.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return parseStringify(response);
  } catch (error) {
    console.error(error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  try {
    const { email, password, firstName, lastName } = userData;
    const { account } = await createAdminClient();

    const newUser = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName}  ${lastName}`
    );
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("shaz-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error) {
    console.error(error);
  }
};
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}

export const logOutAccount = async () => {
  try {
    const { account } = await createAdminClient();
    cookies().delete("shaz-session");
    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
};
