import type { PracticeOnboardingData } from "../types/practiceOnborading.types";

const initialPracticeOnboardingData: PracticeOnboardingData = {
    practiceName: "",
    proposedUrl: "",

    logo: null,
    favicon: null,

    website: "",
    practicePhoneNumber: "",
    contactPersonName: "",
    contactPersonEmail: "",
    contactPersonPhoneNumber: "",

    invoiceSample: null,
    invoiceHeader: "",
    invoiceFooter: "",
    publicEmail: "",

    dataConversion: {
        contacts: null,
        users: null,
        receipts: null,
        businesses: null,
        creditNotes: null,
        tasks: null,
        subscriptionAndDd: null,
        invoices: null
    }
};

export default initialPracticeOnboardingData;