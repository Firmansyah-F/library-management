import { z } from "zod";

export const borrowSchema = z.object({
  memberCode: z.string(),
  bookCode: z.string(),
});

export const returnSchema = z.object({
  memberCode: z.string(),
  bookCode: z.string(),
});
