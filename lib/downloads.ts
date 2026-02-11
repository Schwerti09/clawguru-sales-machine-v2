export type DownloadItem = {
  id: string;
  name: string;
  description: string;
  filePath: string; // under /public
};

export const DOWNLOADS: DownloadItem[] = [
  {
    id: "runbook-pack",
    name: "Runbook Pack (PDF + ZIP)",
    description: "Replace this placeholder with your real paid assets.",
    filePath: "/downloads/runbook-pack-placeholder.txt"
  }
];
