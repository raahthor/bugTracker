"use client";

import * as React from "react";
import {
  IconBug,
  IconBugFilled,
  IconDashboard,
  IconFolder,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import UserData from "@/types/userData";

type CustomSidebarProps = UserData & React.ComponentProps<typeof Sidebar>;
export function AppSidebar({ userData, ...props }: CustomSidebarProps) {
  const data = {
    user: {
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar,
      username: userData.username,
    },
    navMain: [
      {
        title: "Dashboard",
        url: `/u/${userData.username}`,
        icon: IconDashboard,
      },
      {
        title: "Organizations",
        url: "/org",
        icon: IconUsersGroup,
      },
      {
        title: "My Issues",
        url: "/my-issues",
        icon: IconBug,
      },
      {
        title: "Projects",
        url: "#",
        icon: IconFolder,
      },
      {
        title: "Team",
        url: "#",
        icon: IconUsers,
      },
    ],
  };
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href={`/u/${userData.username}`}>
                <IconBugFilled className="!size-6" />
                <span className="text-xl font-semibold">Bug Tracker</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
