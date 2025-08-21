import { Bug } from "./bug";

export interface Member {
  user: { id: string; name: string; username: string; avatar: string };
}
export interface BugProj extends Bug {
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
  bugs: BugProj[];
  members: Member[];
}
