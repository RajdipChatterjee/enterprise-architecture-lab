import { z } from "zod";

export const practiceOnboardingSchema = z.object({
  // Step 1 — Practice Details
  practiceName: z.string().trim().min(1, "Practice name is required"),

  proposedUrl: z.string().trim().min(1, "Proposed URL is required"),

  // Step 2 — Branding
  logo: z.instanceof(File).nullable(),

  favicon: z.instanceof(File).nullable(),

  // Step 3 — Contact Information
  website: z
    .string()
    .trim()
    .min(1, "Website is required")
    .url("Enter a valid website URL"),

  practicePhoneNumber: z
    .string()
    .trim()
    .min(1, "Practice phone number is required"),

  contactPersonName: z
    .string()
    .trim()
    .min(1, "Contact person name is required"),

  contactPersonEmail: z
    .string()
    .trim()
    .min(1, "Contact person email is required")
    .email("Enter a valid email address"),

  contactPersonPhoneNumber: z
    .string()
    .trim()
    .min(1, "Contact person phone number is required"),

  // Step 4 — Invoice & Email
  invoiceSample: z.instanceof(File).nullable(),

  invoiceHeader: z.string().trim().min(1, "Invoice header is required"),

  invoiceFooter: z.string().trim().min(1, "Invoice footer is required"),

  publicEmail: z
    .string()
    .trim()
    .min(1, "Public email is required")
    .email("Enter a valid email address"),

  // Step 5 — Data Conversion
  dataConversion: z.object({
    contacts: z.instanceof(File).nullable(),
    users: z.instanceof(File).nullable(),
    receipts: z.instanceof(File).nullable(),
    businesses: z.instanceof(File).nullable(),
    creditNotes: z.instanceof(File).nullable(),
    tasks: z.instanceof(File).nullable(),
    subscriptionAndDd: z.instanceof(File).nullable(),
    invoices: z.instanceof(File).nullable(),
  }),
});
