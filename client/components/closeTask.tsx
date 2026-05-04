import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toastError from "@/lib/toastError";
import { BugExt as RecentBug } from "@/types/DashboardData";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteBug({
  bugId,
  setIsOpen,
}: {
  bugId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<RecentBug | null>>;
}) {
  const router = useRouter();
  async function closeBug() {
    try {
      const result = await axios.patch(
        `/api/proxy/api/project/close-task`,
        { bugId },
        {
          withCredentials: true,
        }
      );

      if (result.data.success) {
        toast.success("Task closed");
        setIsOpen(null);
        router.refresh();
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401)
        router.push("/login?message=Unauthorized");
      else toastError(err);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Close Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Close Task</DialogTitle>
          <DialogDescription>Are you sure?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={closeBug}>
            Close Task
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
