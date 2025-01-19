import { useQuery } from "@tanstack/react-query";
import { getIssues } from "@/lib/api";

export const useGetIssues = (
  state: "open" | "closed" | "all",
  direction: "asc" | "desc",
  sort: "created" | "updated" | "comments",
  per_page: string,
  page: string
) => {
  return useQuery({
    queryKey: ["issues", { state, direction, sort, per_page, page }],
    queryFn: () => getIssues(state, direction, sort, per_page, page),
  });
};
