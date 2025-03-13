import { z } from "zod";

export const userEditFormSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
    email: z
      .string()
      .nonempty("E-mail is required")
      .email("Invalid e-mail format")
      .max(100, "E-mail must be less than 100 characters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be less than 100 characters"),
    confirmPassword: z.string().nonempty("Confirm your password"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export type TUserEditFormValues = z.infer<typeof userEditFormSchema>;
