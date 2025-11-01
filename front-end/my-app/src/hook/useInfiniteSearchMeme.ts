import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuthContext } from "../context/authContext";
import { searchMemesApi } from "../api/searchMeme.api";

interface UseInfiniteSearchMemeParams {
  tags?: string;
  dateFrom?: Date;
  dateTo?: Date;
  sortBy?: "date" | "votes";
}

export default function useInfiniteSearchMeme({
  tags = "",
  dateFrom,
  dateTo,
  sortBy = "date",
}: UseInfiniteSearchMemeParams) {
  const { user } = useAuthContext();

  return useInfiniteQuery({
    queryKey: ["meme-search", user?.id, tags, dateFrom, dateTo, sortBy],
    queryFn: ({ pageParam }) => {
      return searchMemesApi({
        page: pageParam,
        tags,
        userId: user?.id,
        dateFrom,
        dateTo,
        sortBy,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNextPage
        ? lastPage.pagination.currentPage + 1
        : undefined;
    },
    enabled: (tags && tags.trim().length > 0) || !!dateFrom || !!dateTo,
  });
}
