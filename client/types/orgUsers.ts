export interface OrganizationUsers {
  id: string;
  userId: string;
  orgId: string;
  role: "OWNER" | "MEMBER";
  createdAt: string;
  updatedAt: string;
  organization: { name: string; handle: string; description: string };
}
export interface OrgUsersList {
  orgList: OrganizationUsers[];
}
