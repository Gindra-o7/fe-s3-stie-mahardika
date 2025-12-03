import { FileData, GetUploadResponse, KartuPesertaResponse, SubmitFormPayload, SubmitFormResponse } from "@/interfaces/services/daftar.interface";
import { axiosInstance } from "../../../lib/axios-instance";

export default class DaftarService {
  /**
   * Get all uploaded files
   */
  public static async getUploadedFiles(): Promise<GetUploadResponse> {
    const response = await axiosInstance.get<GetUploadResponse>("/api/upload");
    return response.data;
  }

  /**
   * Upload a new file
   */
  public static async uploadFile(file: File, fieldName: string): Promise<FileData> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", fieldName);

    const response = await axiosInstance({
      method: "post",
      url: "/api/upload",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.response && response.data.data) {
      return response.data.data as FileData;
    }
    throw new Error(response.data.message || "Upload failed");
  }

  /**
   * Update an existing file
   */
  public static async updateFile(file: File, fieldName: string, existingKey: string): Promise<FileData> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", fieldName);
    formData.append("key", existingKey);

    const response = await axiosInstance({
      method: "put",
      url: "/api/upload",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.response && response.data.data) {
      return response.data.data as FileData;
    }
    throw new Error(response.data.message || "Update failed");
  }

  /**
   * Delete a file by key
   */
  public static async deleteFile(key: string): Promise<void> {
    await axiosInstance.delete("/api/upload", {
      data: { key },
    });
  }

  /**
   * Submit registration form
   */
  public static async submitForm(payload: SubmitFormPayload): Promise<SubmitFormResponse> {
    const response = await axiosInstance.post<SubmitFormResponse>("/api/daftar-berkas", payload);
    return response.data;
  }

  /**
   * Get kartu peserta (for preview/download)
   */
  public static async getKartuPeserta(): Promise<KartuPesertaResponse> {
    const response = await axiosInstance.get("/api/kartu-peserta", {
      responseType: "blob",
    });

    const contentType = response.headers["content-type"] || "application/pdf";
    return {
      blob: response.data,
      contentType,
    };
  }
}
