import IssueTable from "@/components/issue-table";

export default function Home() {
  return (
    <main className="max-w-[100ch] flex flex-col m-auto p-5 gap-9">
      <h1 className="font-bold text-3xl">Search Pokemon</h1>
      <IssueTable />
    </main>
  );
}
