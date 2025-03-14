import { httpClient } from "./http-client";


export class ApiFacade {
  async get<T>(url: string, params?: object): Promise<T> {
    const response = await httpClient.get<T>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data: object): Promise<T> {
    const response = await httpClient.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data: object): Promise<T> {
    const response = await httpClient.put<T>(url, data);
    return response.data;
  }

  async patch<T>(url: string, data: object): Promise<T> {
    const response = await httpClient.patch<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await httpClient.delete<T>(url);
    return response.data;
  }
}
