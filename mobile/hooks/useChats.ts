import { useApi } from "@/lib/axios";
import { Chat } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useChats = () => {
  const {apiWithAuth} = useApi();

  return useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const { data } = await apiWithAuth<Chat[]>({method: "get", url: "/chats"});
      return data;
    },
  });
};

export const useGetOrCreateChat = () => {
  const { apiWithAuth } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (participantId: string) => {
      const { data } = await apiWithAuth<Chat>({
        method: "POST",
        url: `/chats/with/${participantId}`,
      });
      return data;
    },
    onSuccess: () => {
      // Invalidate chats query to refetch the updated list of chats
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
};