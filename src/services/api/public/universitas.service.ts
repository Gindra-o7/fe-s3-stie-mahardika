import { apiUniversity } from "@/lib/axios-instance";
import { University } from "@/interfaces/service/api/public/university.interface";

export default class UniversityService {
  public static async searchUniversity({ query }: { query: string }): Promise<University[]> {
    if (!query.trim()) {
      return [];
    }

    try {
      const response = await apiUniversity().get(`/search/pt/${encodeURIComponent(query)}`);
      return response.data.slice(0, 5);
    } catch (error) {
      console.error("Error fetching universities:", error);
      throw new Error("Gagal memuat data universitas");
    }
  }
}
