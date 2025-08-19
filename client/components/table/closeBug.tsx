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
import { env } from "@/lib/env";
import toastError from "@/lib/toastError";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteBug({ bugId }: { bugId: string }) {
  const router = useRouter();
  async function closeBug() {
    try {
      const result = await axios.patch(
        `${env.API_URL}/api/close-bug`,
        { bugId },
        {
          withCredentials: true,
        }
      );

      if (result.data.success) {
        toast.success("Bug closed");
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
        <Button variant="secondary">Close Bug</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Close Bug</DialogTitle>
          <DialogDescription>Are you sure?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={closeBug}>
            Close Bug
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
