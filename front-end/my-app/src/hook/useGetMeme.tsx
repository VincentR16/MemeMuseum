import { useQuery } from "@tanstack/react-query";
import { getMemeByIdApi } from "../api/getMeme";

export function useGetMeme(id: string, userId?: string) {
  return useQuery({
    queryKey: ["meme", id],
    queryFn: () => getMemeByIdApi(id, userId),
    enabled: !!id,
  });
}
