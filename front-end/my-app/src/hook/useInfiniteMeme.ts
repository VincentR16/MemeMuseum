import { useInfiniteQuery } from "@tanstack/react-query";
import { getMemeApi } from "../api/getMeme.api";

export default function useInfiniteMeme() {
  return useInfiniteQuery({
    queryKey: ["meme"],
    queryFn: ({ pageParam }) => getMemeApi(pageParam),
    initialPageParam: 1, 
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNextPage
        ? lastPage.pagination.currentPage + 1
        : undefined;
    },
  });
}
