import api from "./axios";
import type { PracticeOnboardingData } from "../features/practiceOnboarding/types/practiceOnboarding.types";

export const createPractice = async (data: PracticeOnboardingData) => {
  const formData = new FormData();

  // Step 1
  formData.append("PracticeName", data.practiceName);
  formData.append("ProposedUrl", data.proposedUrl);

  // Step 2
  if (data.logo) {
    formData.append("Logo", data.logo);
  }

  if (data.favicon) {
    formData.append("Favicon", data.favicon);
  }

  // Step 3
  formData.append("Website", data.website);
  formData.append("PracticePhoneNumber", data.practicePhoneNumber);
  formData.append("ContactPersonName", data.contactPersonName);
  formData.append("ContactPersonEmail", data.contactPersonEmail);
  formData.append("ContactPersonPhoneNumber", data.contactPersonPhoneNumber);

  // Step 4
  if (data.invoiceSample) {
    formData.append("InvoiceSample", data.invoiceSample);
  }

  formData.append("InvoiceHeader", data.invoiceHeader);

  formData.append("InvoiceFooter", data.invoiceFooter);

  formData.append("PublicEmail", data.publicEmail);

  // Step 5
  if (data.dataConversion.contacts) {
    formData.append("Contacts", data.dataConversion.contacts);
  }

  if (data.dataConversion.users) {
    formData.append("Users", data.dataConversion.users);
  }

  if (data.dataConversion.receipts) {
    formData.append("Receipts", data.dataConversion.receipts);
  }

  if (data.dataConversion.businesses) {
    formData.append("Businesses", data.dataConversion.businesses);
  }

  if (data.dataConversion.creditNotes) {
    formData.append("CreditNotes", data.dataConversion.creditNotes);
  }

  if (data.dataConversion.tasks) {
    formData.append("Tasks", data.dataConversion.tasks);
  }

  if (data.dataConversion.subscriptionAndDd) {
    formData.append("SubscriptionAndDd", data.dataConversion.subscriptionAndDd);
  }

  if (data.dataConversion.invoices) {
    formData.append("Invoices", data.dataConversion.invoices);
  }

  const response = await api.post("/Practices", formData);

  return response.data;
};
