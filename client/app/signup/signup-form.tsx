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
import handleApiError from "@/lib/handleApiError";
import { env } from "@/lib/env";
import { useRouter } from "next/navigation";
import APIResponse from "@/types/apiResponse";
import UserData from "@/types/userData";

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

    if (userInput.username.length < 4)
      return toast.error("Username must be larger than 4 chars");
    else if (userInput.password.length < 6)
      return toast.error("Password must be larger than 6 chars");

    try {
      setIsSubmitting(true);
      const response: APIResponse<UserData> = await axios.post(
        `${env.API_URL}/api/complete-profile`,
        {
          name: userInput.fullName,
          username: userInput.username,
          password: userInput.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        toast.success(response.data.message);
        router.push(`/u/${response.data.data.userData.username}`);
      }
    } catch (err) {
      handleApiError(err);
      if (
        axios.isAxiosError<APIErrorRes>(err) &&
        err.response?.data?.data?.userData?.username
      )
        router.push(`/u/${err.response?.data?.data?.userData?.username}`);
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
                <Label htmlFor="email">Full Name</Label>
                <Input
                  name="fullName"
                  type="text"
                  value={userInput.fullName}
                  onChange={handleUserInput}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Username</Label>
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
