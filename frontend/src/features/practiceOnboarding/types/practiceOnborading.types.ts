export interface PracticeOnboardingData {
    // Step 1 — Practice Details
    practiceName: string;
    proposedUrl: string;

    // Step 2 — Branding
    logo: File | null;
    favicon: File | null;

    // Step 3 — Contact Information
    website: string;
    practicePhoneNumber: string;
    contactPersonName: string;
    contactPersonEmail: string;
    contactPersonPhoneNumber: string;

    // Step 4 — Invoice & Email
    invoiceSample: File | null;
    invoiceHeader: string;
    invoiceFooter: string;
    publicEmail: string;

    // Step 5 — Data Conversion
    dataConversion: DataConversionData;
}

export interface DataConversionData {
    contacts: File | null;
    users: File | null;
    receipts: File | null;
    businesses: File | null;
    creditNotes: File | null;
    tasks: File | null;
    subscriptionAndDd: File | null;
    invoices: File | null;
}