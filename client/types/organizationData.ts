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
interface Projects {
  id: string;
  name: string;
  description: string;
  orgId: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
export interface Member {
  id: string;
  name: string;
  email: string;
  role: "OWNER" | "MEMBER";
  avatar: string;
}
export interface OrgnaizationData {
  orgData: Organization;
  members: Member[];
}
