// export type SurveyStatus = "Active" | "Inactive" | "Completed";

export enum SurveyStatus
{
    Unknown ,
    Active,
    Inactive,
    Pending,
    Completed
}

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

export type CreateSurveyPayload = Omit<
  Survey,
  "id" | "createdAt"
>;

export type UpdateSurveyPayload = CreateSurveyPayload;

export type SurveyFilterFields = Pick<
  Survey,
  | "status"
  | "rating"
  | "userName"
  | "accountantName"
  | "businessName"
>;

export type SurveyFilters = Partial<SurveyFilterFields>;

export interface SurveyParams extends SurveyFilters {
  search?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDescending?: boolean;
}