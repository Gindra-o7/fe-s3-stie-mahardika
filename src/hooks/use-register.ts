import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-instance";

interface RegisterRequest {
  nama: string;
  email: string;
  no_wa: string;
}

interface RegisterResponse {
  response: boolean;
  message: string;
  data: {
    order_id: string;
    snap_token: string;
    redirect_url: string;
  };
}

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await axiosInstance.post<RegisterResponse>("/api/register", data);
      return response.data;
    },
  });
};
