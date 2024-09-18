import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { object, string } from "zod"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const signInSchema = object({
  username: string({ required_error: "Username is required" })
    .min(1, "Username is required"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})
