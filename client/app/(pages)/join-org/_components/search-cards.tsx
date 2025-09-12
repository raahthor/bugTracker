"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { SearchList } from "@/types/searchList";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { env } from "@/lib/env";
import { ResponseExt } from "@/types/responseExt";
import toastError from "@/lib/toastError";

export default function SearchCards({ org }: { org: SearchList }) {
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
        `${env.API_URL}/api/join-org`,
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
    <Card className="@container/card">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {org.name}
        </CardTitle>
        <CardDescription className=" font-semibold">
          <p>@ {org.handle}</p> <p>Owner: {org.owner}</p>
        </CardDescription>
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
                className="text-sm max-w-100 border-black/40"
                required
              />
              <Button disabled={isSubmitting} type="submit">
                Join
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
