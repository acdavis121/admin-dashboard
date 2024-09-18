"use server";
const bcrypt = require("bcryptjs");

export async function saltAndHashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}
