"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import debounce from "@/lib/debounce";
import { env } from "@/lib/env";
import toastError from "@/lib/toastError";
import { ResponseExt } from "@/types/responseExt";
import { SearchList } from "@/types/searchList";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import SearchCards from "./search-cards";

export default function JoinOrg() {
  const router = useRouter();
  const [searchList, setSearchList] = useState<SearchList[] | undefined>();

  const getSearchList = useCallback(
    async (title: string) => {
      if (!title.trim()) return;
      try {
        const result: ResponseExt<{ searchList: SearchList[] }> =
          await axios.get(`${env.API_URL}/api/search-org/${title}`, {
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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 p-4">
        <Label>Search Organization</Label>
        <Input
          placeholder="Start typing..."
          onChange={(e) => debounceSearch(e.target.value)}
        />
      </div>
      {searchList?.length !== 0 ? (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 ">
          {searchList?.map((org, idx) => (
            <SearchCards key={idx} org={org} />
          ))}
        </div>
      ) : (
        <div className="p-4 font-semibold text-lg">No organization found</div>
      )}
    </div>
  );
}
