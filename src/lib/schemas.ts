import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().min(1, "Email input should not be empty").email(),
    password: z.string().min(6, "Password length must be greater than 6"),
    nationality: z.string().min(1, "Please select your nationality"),
    username: z.string().min(1, "Username input should not be empty"),
    confirmPassword: z
      .string()
      .min(1, "Confirm password input should not be empty")
      .optional(),
    image: z.number().gt(0).or(z.string()).or(z.instanceof(File)).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().min(1, "Email input should not be empty").email(),
  password: z.string().min(6, "Password length must be greater than 6"),
});

export const resetSchema = z.object({
  email: z.string().email(),
});

export const updateSchema = z.object({
  password: z.string().min(6, "Password length must be greater than 6"),
  confirmPassword: z
    .string()
    .min(1, "Confirm password input should not be empty")
    .optional(),
});