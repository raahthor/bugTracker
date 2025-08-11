interface Organization {
  id: string;
  name: string;
  description: string;
  handle: string;
  joinCode: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  projects: Projects[];
}
interface Membership {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  orgId: string;
  role: "OWNER" | "MEMBER";
}
interface Projects {
  id: string;
  name: string;
  orgId: string;
  createdAt: string;
  updatedAt: string;
}
interface Members {}
export interface OrgnaizationData {
  orgData: Organization;
  membership: Membership;
}
// add more types like all members and projects
