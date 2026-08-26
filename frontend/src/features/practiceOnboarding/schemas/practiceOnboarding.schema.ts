import { z } from "zod";

export const practiceOnboardingSchema = z.object({
  practiceName: z
    .string()
    .min(1, "Practice name is required"),

  proposedUrl: z
    .string()
    .min(1, "Proposed URL is required"),
});