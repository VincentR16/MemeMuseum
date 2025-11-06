import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuthContext } from "../context/authContext";
import { getDailyMemesApi } from "../api/getDailyMemes.api";

export default function useInfiniteDayliMemes() {
  const { user } = useAuthContext();
  
  return useInfiniteQuery({
    queryKey: ["daily", user?.id],
    queryFn: ({ pageParam }) => {
      return getDailyMemesApi({ page: pageParam, userId: user?.id });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNextPage
        ? lastPage.pagination.currentPage + 1
        : undefined;
    },
  });
}
