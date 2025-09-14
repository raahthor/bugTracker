"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import toastError, { isLengthError } from "@/lib/toastError";
import { useRouter } from "next/navigation";
import { ResponseExt } from "@/types/responseExt";

type FormData = {
  fullName: string;
  username: string;
  password: string;
};

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<FormData>({
    fullName: "",
    username: "",
    password: "",
  });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputVal = ["username", "password"].includes(name)
      ? value.trim()
      : value;
    setUserInput((prev) => ({ ...prev, [name]: inputVal }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      isLengthError("Username", userInput.username, 4) ||
      isLengthError("Password", userInput.password, 6)
    )
      return;
    try {
      setIsSubmitting(true);
      const response: ResponseExt<{ username: string }> = await axios.post(
        `/api/proxy/api/complete-profile`,
        {
          name: userInput.fullName.trim(),
          username: userInput.username,
          password: userInput.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        toast.success(response.data.message);
        router.push(`/u/${response.data.data.username}`);
      }
    } catch (err) {
      toastError(err);
      if (axios.isAxiosError(err) && err.response?.status === 401)
        router.push("/login?message=Unauthorized!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Hey</CardTitle>
          <CardDescription>
            Fill up the details to complete your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  name="fullName"
                  type="text"
                  value={userInput.fullName}
                  onChange={handleUserInput}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  name="username"
                  type="text"
                  value={userInput.username}
                  onChange={handleUserInput}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  type="password"
                  value={userInput.password}
                  onChange={handleUserInput}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
