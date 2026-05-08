import { z } from "zod";

export const stripeKeySchema = z.object({
  stripeKey: z
    .string()
    .min(10)
    .refine((val) => val.startsWith("sk_live_") || val.startsWith("sk_test_"), {
      message: "Stripe key must start with sk_live_ or sk_test_",
    }),
});

export const emailPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
