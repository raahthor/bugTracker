"use client";
import { Button } from "@/components/ui/button";
import { Plus, Building2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { RecentOrg } from "@/types/DashboardData";
import { Badge } from "@/components/ui/badge";

export function OrganizationButtons() {
  const router = useRouter();
  return (
    <>
      <Button
        size="lg"
        onClick={() => router.push("/create-org")}
        className="bg-primary  shadow-lg hover:shadow-primary/25 transition-all duration-300 group"
      >
        <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
        Create Organization
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={() => router.push("/join-org")}
        className="transition-all duration-300 group"
      >
        <Building2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
        Join Organization
      </Button>
    </>
  );
}

export function RecentOrganizations({ orgs }: { orgs: RecentOrg[] }) {
  const router = useRouter();
  return (
    <div>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-12 ">
        {orgs.length !== 0 ? (
          orgs.map((org, idx) => (
            <Card
              key={idx}
              onClick={() => router.push(`/org/${org.handle}`)}
              className="@container/card bg-card/50 backdrop-blur-sm  hover:border-primary/50 transition-all duration-300 group cursor-pointer"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {org.name.charAt(0)}
                        </span>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {org.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {org.description}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline" className="text-xs">
                      @{org.handle}
                    </Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground text-lg font-medium">
            No recent Organizations
          </p>
        )}
      </div>
    </div>
  );
}
