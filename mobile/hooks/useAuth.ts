import { useApi } from "@/lib/axios";
import { User } from "@/types";
import { useMutation } from "@tanstack/react-query";

interface SyncUserResponse {
  user: User;
}

export const useAuthCallback = () => {
    const {apiWithAuth} = useApi();
    
    return useMutation<SyncUserResponse>({
        mutationFn: async () => {
            const {data} = await apiWithAuth<SyncUserResponse>({
                method: 'post',
                url: '/auth/callback'
            });
            return data;
        }
    });
};