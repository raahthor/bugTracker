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
  async function deleteBug() {
    try {
      const result = await axios.delete(
        `${env.API_URL}/api/delete-bug/${bugId}`,
        {
          withCredentials: true,
        }
      );
      console.log(result)
      if (result.data.success) {
        toast.success("Bug deleted");
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
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Bug</DialogTitle>
          <DialogDescription>
            Are you sure? This action is irreversible!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={deleteBug}>
            Delete
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
