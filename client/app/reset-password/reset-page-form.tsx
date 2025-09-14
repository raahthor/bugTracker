"use client";
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
import toastError, { isLengthError } from "@/lib/toastError";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function ResetPageForm({
  token,
}: {
  token: string | undefined;
}) {
  const router = useRouter();
  const [input, setInput] = useState({ pass: "", confPass: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (isLengthError("Password", input.pass, 6)) return;
      if (input.pass !== input.confPass) {
        toast.error("Password didn't match");
        return;
      }
      const result = await axios.patch(`/api/proxy/api/reset-password`, {
        newPass: input.pass,
        token,
      });
      if (result.data.success) {
        toast.success("Password reset, redirecting to login page");
        router.push("/login");
      }
    } catch (err) {
      toastError(err);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className={"flex flex-col gap-6"}>
      <Card>
        <CardHeader>
          <CardTitle>Generate new password</CardTitle>
          <CardDescription>Create a strong password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label>Enter Password</Label>
                <Input
                  name="pass"
                  type="password"
                  value={input.pass}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label>Re-enter Password</Label>
                <Input
                  name="confPass"
                  type="password"
                  value={input.confPass}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  Reset Password
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
