import { Bug } from "./ProjectData";

export interface RecentBug extends Bug {
  project: { name: string; slug: string; organization: { handle: string } };
}
export interface RecentOrg {
  id: string;
  name: string;
  handle: string;
  description: string;
}
export interface DashboardData {
  recentBugs: RecentBug[];
  recentOrgs: RecentOrg[];
}
