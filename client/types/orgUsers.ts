export interface OrganizationUsers {
  id: string;
  userId: string;
  orgId: string;
  role: "OWNER" | "MEMBER";
  createdAt: Date;
  updatedAt: Date;
}
export interface OrgUsersList {
  orgList: OrganizationUsers[];
}
