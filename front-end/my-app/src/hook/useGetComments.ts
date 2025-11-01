import { useQuery } from "@tanstack/react-query";
import { getCommentsApi } from "../api/getComments.api";

export default function useGetComments(memeId: string) {
  return useQuery({
    queryKey: ["comments", memeId],
    queryFn: () => getCommentsApi(memeId),
  });
}
