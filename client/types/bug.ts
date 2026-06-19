export interface Bug {
  id: string;
  name: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  projectId: string;
  createdAt: string;
  updatedAt: string;
}
