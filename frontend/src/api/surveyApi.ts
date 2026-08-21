import api from "./axios";

import type { ApiResponse, PaginatedResponse } from "../types/api";

import type {
  Survey,
  SurveyParams,
  CreateSurveyPayload,
  UpdateSurveyPayload,
} from "../types/survey";

// GET ALL
export async function getSurveys(
  params?: SurveyParams,
): Promise<ApiResponse<PaginatedResponse<Survey>>> {
  const response = await api.get<ApiResponse<PaginatedResponse<Survey>>>("/surveys",
    {params,},
  );

  return response.data;
}

// GET BY ID
export async function getSurveyById(id: string): Promise<ApiResponse<Survey>> {
  const response = await api.get<ApiResponse<Survey>>(`/surveys/${id}`);

  return response.data;
}

// CREATE
export async function createSurvey(
  data: CreateSurveyPayload,
): Promise<ApiResponse<Survey>> {
  const response = await api.post<ApiResponse<Survey>>("/surveys", data);

  return response.data;
}

// UPDATE
export async function updateSurvey(
  id: string,
  data: UpdateSurveyPayload,
): Promise<ApiResponse<Survey>> {
  const response = await api.put<ApiResponse<Survey>>(`/surveys/${id}`, data);

  return response.data;
}

// SOFT DELETE
export async function deleteSurvey(id: string): Promise<ApiResponse<unknown>> {
  const response = await api.delete<ApiResponse<unknown>>(`/surveys/${id}`);

  return response.data;
}
