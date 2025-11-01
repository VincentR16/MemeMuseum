import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuthContext } from "../context/authContext";
import { getMemesApi } from "../api/getMemes.api";

interface UseInfiniteMemeParams {
  sortBy?: "date" | "votes";
}
export default function useInfiniteMeme({ sortBy }: UseInfiniteMemeParams) {
  const { user } = useAuthContext();

  return useInfiniteQuery({
    queryKey: ["meme", user?.id, sortBy],
    queryFn: ({ pageParam }) => {
      return getMemesApi(pageParam, user?.id, sortBy);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNextPage
        ? lastPage.pagination.currentPage + 1
        : undefined;
    },
  });
}
