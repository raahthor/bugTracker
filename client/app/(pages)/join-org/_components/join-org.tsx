"use client";
import { Input } from "@/components/ui/input";
import debounce from "@/lib/debounce";
import toastError from "@/lib/toastError";
import { ResponseExt } from "@/types/responseExt";
import { SearchList } from "@/types/searchList";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";

export default function JoinOrg() {
  const router = useRouter();
  const [searchList, setSearchList] = useState<SearchList[] | undefined>();

  const getSearchList = useCallback(
    async (title: string) => {
      if (!title.trim()) return;
      try {
        const result: ResponseExt<{ searchList: SearchList[] }> =
          await axios.get(`/api/proxy/api/search-org/${title}`, {
            withCredentials: true,
          });
        setSearchList(result.data.data.searchList);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401)
          router.push("/login?message=Unauthorized");
        else toastError(error);
      }
    },
    [router]
  );

  const debounceSearch = useMemo(
    () => debounce(getSearchList),
    [getSearchList]
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Input
          placeholder="Start typing..."
          onChange={(e) => debounceSearch(e.target.value)}
        />
      </div>
      {searchList?.length !== 0 ? (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 ">
          {searchList?.map((org, idx) => (
            <OrgCards key={idx} org={org} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-lg font-medium mt-6 text-center">
          No organization found
        </p>
      )}
    </div>
  );
}

function OrgCards({ org }: { org: SearchList }) {
  const router = useRouter();
  const [joinCode, setJoinCode] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (joinCode.length != 8) {
      toast.error("Invite Code must be 8 characters");
      return;
    }
    try {
      setIsSubmitting(true);
      const result: ResponseExt<{ handle: string }> = await axios.post(
        `/api/proxy/api/join-org`,
        {
          orgId: org.id,
          joinCode,
        },
        { withCredentials: true }
      );

      if (result.data.success) router.push(`/org/${result.data.data.handle}`);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401)
        router.push("/login?message=Unauthorized");
      else toastError(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="@container/card bg-card/50 backdrop-blur-sm  hover:border-primary/50 transition-all duration-300 group cursor-pointer">
      <CardHeader>
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
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className="text-xs">
              @{org.handle}
            </Badge>
          </div>
        </div>
        <p className="text-muted-foreground text-sm font-medium">
          Owned : {org.owner}
        </p>
      </CardHeader>
      <CardContent>
        {org.isMember ? (
          <div className="font-semibold">You&apos;re already a Member</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex items-start gap-2 text-xs">
              <Input
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="Invite Code"
                className="text-sm max-w-120 border-black/40"
                required
              />
              <Button disabled={isSubmitting} type="submit">
                <Building2 />
                Join
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
