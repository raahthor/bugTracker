"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toastError from "@/lib/toastError";
import { cn } from "@/lib/utils";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

export default function ForgotPageForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const result = await axios.post(`/api/proxy/api/forgot-password`, {
        username: input.trim(),
      });
      if (result.data.success) toast.success(result.data.message);
    } catch (err) {
      toastError(err);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardDescription>
            Enter your username and a reset password link will be sent to your
            registered email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Enter Username</Label>
                <Input
                  name="username"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  Send Reset Link
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
