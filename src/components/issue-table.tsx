"use client";

import { useGetIssues } from "@/hooks/use-get-issues";
import { Issue } from "@/lib/types";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "./ui/data-table";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleCheck, CircleDot } from "lucide-react";

const columnHelper = createColumnHelper<Issue>();

const columns = [
  columnHelper.accessor(
    (row) => {
      return {
        title: row.title,
        state: row.state,
        number: row.number,
        user: row.user.login,
        avatar: row.user.avatar_url,
      };
    },
    {
      header: "Issue",
      cell: (info) => {
        const issue = info.getValue();
        const state = issue.state;
        return (
          <div className="flex gap-3">
            {state === "open" ? (
              <CircleDot className="h-4 w-4 min-w-4 min-h-4 stroke-green-700" />
            ) : (
              <CircleCheck className="h-4 w-4 min-w-4 min-h-4 stroke-violet-700" />
            )}
            <div className="flex flex-col gap-2">
              <p className="font-bold">{issue.title}</p>
              <div className="flex gap-2">
                <p className="text-xs text-neutral-500">
                  #{issue.number} opened by {issue.user}
                </p>
                <Avatar className="min-h-5 min-w-5 w-5 h-5 justify-center items-center">
                  <AvatarImage src={issue.avatar} />
                </Avatar>
              </div>
            </div>
          </div>
        );
      },
    }
  ),
];

const IssueTable = () => {
  const [sorting, setSorting] = useState<"asc" | "desc">("desc");
  const [state, setState] = useState<"open" | "closed" | "all">("closed");
  const { data, isPending, isError } = useGetIssues(
    state,
    sorting,
    "created",
    "20",
    "1"
  );

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error!</p>;
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3">
        <Select
          value={sorting}
          onValueChange={(v) => setSorting(v as "asc" | "desc")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Newest</SelectItem>
            <SelectItem value="asc">Oldest</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={state}
          onValueChange={(v) => setState(v as "open" | "closed" | "all")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable columns={columns} data={data} />;
    </div>
  );
};

export default IssueTable;
