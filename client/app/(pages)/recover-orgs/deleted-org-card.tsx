"use client";
import { Badge } from "@/components/ui/badge";
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
import toastError from "@/lib/toastError";
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
  const daysLeft = 30 - (new Date().getDate() - new Date(deletedAt).getDate());
  return (
    <Card className="@container/card bg-card/50 backdrop-blur-sm  hover:border-primary/50 transition-all duration-300 group cursor-pointer">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {name.charAt(0)}
                </span>
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {name}
              </CardTitle>
            </div>
            <CardDescription className="text-base">
              {description}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className="text-xs">
              @{handle}
            </Badge>
          </div>
        </div>
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
  const router = useRouter();
  async function recoverOrg() {
    try {
      const result = await axios.patch(
        `/api/proxy/api/settings/recover-org`,
        { orgId: id },
        { withCredentials: true }
      );
      if (result.data.success) {
        toast.success("Organization recoverd successfully");
        router.refresh();
      }
      setIsOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401)
        router.push("/login?message=Unauthorized");
      else toastError(error);
    }
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
