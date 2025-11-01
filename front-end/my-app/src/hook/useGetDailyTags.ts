import { useQuery } from "@tanstack/react-query";
import { getDailyTagsApi } from "../api/getDailyTags.api";

export default function useDailyTags() {
  return useQuery({
    queryKey: ["dailyTags"],
    queryFn: () => getDailyTagsApi(),
  });
}
