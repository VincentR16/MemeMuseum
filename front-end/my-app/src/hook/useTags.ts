import { useQuery } from "@tanstack/react-query";
import { getTagsApi } from "../api/getTags.api";

export default function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => getTagsApi(),
  });
}
