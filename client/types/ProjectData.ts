export interface Bug {
  id: string;
  name: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  projectId: string;
  assignedTo: string;
  raisedBy: string;
  createdAt: string;
  updatedAt: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  orgId: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  bugs: Bug[];
}
export interface ProjectData {
  projectData: Project;
}
