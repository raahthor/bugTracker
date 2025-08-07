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
import { cn } from "@/lib/utils";
import { env } from "@/lib/env";
import { useState } from "react";
import toastError, { isLengthError } from "@/lib/toastError";

export default function CreateOrgForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<{ name: string; handle: string }>({
    name: "",
    handle: "",
  });
  function handleUserInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const inputVal = name === "handle" ? value.trim() : value;
    setUserInput((prev) => ({ ...prev, [name]: inputVal }));
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      isLengthError("Name", userInput.name, 6) ||
      isLengthError("Handle", userInput.handle, 4)
    )
      return;

    setIsSubmitting(true);
    try {
      console.log("got try block");
      throw "";
    } catch (error) {
      toastError(error);
    } finally {
      setIsSubmitting(false);
    }
    // create org
  }
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Create Organization</CardTitle>
          <CardDescription>
            Fill up the details to create your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Organization Name</Label>
                <Input
                  name="name"
                  type="text"
                  value={userInput.name}
                  onChange={handleUserInput}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="handle">Handle</Label>
                <Input
                  name="handle"
                  type="text"
                  value={userInput.handle}
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
                  {isSubmitting ? "Creating ..." : "Create Organization"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
