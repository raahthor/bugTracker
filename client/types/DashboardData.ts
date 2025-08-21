import { Bug } from "./bug";

export interface BugExt extends Bug {
  project: { name: string; slug: string; organization: { handle: string } };
  raisedByUser: { name: string; avatar: string; username: string };
}
export interface RecentOrg {
  id: string;
  name: string;
  handle: string;
  description: string;
}
export interface DashboardData {
  recentBugs: BugExt[];
  recentOrgs: RecentOrg[];
}
