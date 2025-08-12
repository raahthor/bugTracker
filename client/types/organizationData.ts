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
  role: string;
  avatar: string;
}
export interface OrgnaizationData {
  orgData: Organization;
  membership: Membership;
  members: Member[];
}
