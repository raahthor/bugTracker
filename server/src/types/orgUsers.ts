export interface OrgUsers {
  id: string;
  userId: string;
  orgId: string;
  role: "OWNER" | "MEMBER";
}
