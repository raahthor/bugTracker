export interface Member {
  user: { name: string; username: string; avatar: string };
}
export interface Bug {
  id: string;
  name: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  projectId: string;
  createdAt: string;
  updatedAt: string;
  assignedUser: { name: string; avatar: string; username: string };
  raisedByUser: { name: string; avatar: string; username: string };
}

interface Project {
  id: string;
  name: string;
  description: string;
  orgId: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
export interface ProjectData {
  projectData: Project;
  bugs: Bug[];
  members: Member[];
}
