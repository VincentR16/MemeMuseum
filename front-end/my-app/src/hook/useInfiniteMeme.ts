import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuthContext } from "../context/authContext";
import { getMemesApi } from "../api/getMemes.api";

export default function useInfiniteMeme() {
  const { user } = useAuthContext();

  return useInfiniteQuery({
    queryKey: ["meme", user?.id],
    queryFn: ({ pageParam }) => {
      return getMemesApi(pageParam, user?.id);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNextPage
        ? lastPage.pagination.currentPage + 1
        : undefined;
    },
  });
}
