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
import handleApiError from "@/utils/handleApiError";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [userInput, setUserInput] = useState<{
    fullName: string;
    username: string;
    password: string;
  }>({ fullName: "", username: "", password: "" });

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
    console.log(userInput);
    try {
      const response = await axios.post(
        `${apiUrl}/api/complete-profile`,
        {
          name: userInput.fullName,
          username: userInput.username,
          password: userInput.password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else toast.error(response.data.message);
    } catch (error: unknown) {
      handleApiError(error);
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
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
