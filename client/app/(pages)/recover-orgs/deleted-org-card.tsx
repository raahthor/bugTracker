"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { env } from "@/lib/env";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function DeletedOrgCard({
  id,
  name,
  deletedAt,
  handle,
  description,
}: {
  id: string;
  name: string;
  deletedAt: string;
  handle: string;
  description: string;
}) {
  const router = useRouter();
  const daysLeft = 30 - (new Date().getDate() - new Date(deletedAt).getDate());
  return (
    <Card className="@container/card bg-red-100">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {name}
        </CardTitle>
        <CardDescription>
          <p className="font-semibold mb-2">@ {handle}</p> <p>{description}</p>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="font-semibold text-red-600">
          Remaining : {daysLeft} days
        </div>
        <RecoverButton id={id} />
      </CardFooter>
    </Card>
  );
}

function RecoverButton({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  async function recoverOrg() {
    try {
      const result = await axios.patch(
        `${env.API_URL}/api/settings/recover-org`,
        { orgId: id },
        { withCredentials: true }
      );
      if (result.data.success)
        toast.success("Organization recoverd successfully");
      setIsOpen(false);
    } catch (err) {}
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Recover Organization</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            Recovering will restore this organization to your organizations list
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={recoverOrg}>Recover</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
