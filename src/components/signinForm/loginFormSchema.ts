import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().nonempty("E-mail is required"),
  password: z.string().nonempty("Password is required"),
});

export type TLoginFormValues = z.infer<typeof loginFormSchema>;
