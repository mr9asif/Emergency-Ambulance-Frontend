import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),

  email: z.string().email("Please enter a valid email address"),

  phone: z.string().min(5, "Phone number is required"),

  password: z.string().min(8, "Password must be at least 8 characters"),

  role: z.enum(["PATIENT", "AMBULANCE_DRIVER", "DISPATCHER"]),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export type RegisterFormValues = z.infer<typeof registerSchema>;
