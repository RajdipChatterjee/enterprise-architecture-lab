export type SurveyStatus = "Active" | "Inactive" | "Completed";

export interface Survey {
  id: string;
  rating: number;
  feedback: string;
  userName: string;
  accountantName: string;
  businessName: string;
  status: SurveyStatus;
  createdAt: string;
}

export interface CreateSurveyPayload {
  rating: number;
  feedback: string;
  userName: string;
  accountantName: string;
  businessName: string;
  status: SurveyStatus;
}

export interface UpdateSurveyPayload {
  rating: number;
  feedback: string;
  userName: string;
  accountantName: string;
  businessName: string;
  status: SurveyStatus;
}

export interface SurveyParams {
  search?: string;

  status?: SurveyStatus;
  rating?: number;
  userName?: string;
  accountantName?: string;
  businessName?: string;

  fromDate?: string;
  toDate?: string;

  page?: number;
  pageSize?: number;

  sortBy?: string;
  sortDescending?: boolean;
}