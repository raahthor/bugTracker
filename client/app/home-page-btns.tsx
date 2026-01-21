"use client";

import { Button } from "@/components/ui/button";
import toastError from "@/lib/toastError";
import { ResponseExt } from "@/types/responseExt";
import UserData from "@/types/userData";
import axios from "axios";
import { ExternalLink, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function LoginButton() {
  const router = useRouter();
  return (
    <Button variant="ghost" size="sm" onClick={() => router.push("/login")}>
      Login
    </Button>
  );
}
export function SignupButton() {
  const router = useRouter();
  return (
    <Button size="sm" onClick={() => router.push("/api/proxy/auth/google")}>
      Sign Up
    </Button>
  );
}
export function ViewCodeButton() {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => router.push("https://github.com/raahthor/bugTracker")}
    >
      <Github className="h-4 w-4 mr-2" />
      View Source
    </Button>
  );
}
// work on below buttons
export function DemoLoginButton() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function handleDemoLogin() {
    try {
      setIsSubmitting(true);
      const response: ResponseExt = await axios.post(
        "/api/proxy/api/login",
        {
          username: "demouser",
          password: "demopass",
        }
      );
      if (response.data?.success) {
        toast.success(response.data.message);
        router.push(`/u/${response.data.data.userData.username}`);
      }
    } catch (err) {
      toastError(err);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Button
      size="lg"
      className="hover:scale-105"
      disabled={isSubmitting}
      onClick={handleDemoLogin}
    >
      <ExternalLink className="mr-2 h-5 w-5" />
      View Live Demo
    </Button>
  );
}
export function ViewCodeButtonLG() {
  const router = useRouter();
  return (
    <Button
      size="lg"
      variant="outline"
      onClick={() => router.push("https://github.com/raahthor/bugTracker")}
    >
      <Github className="mr-2 h-5 w-5" />
      View Source on GitHub
    </Button>
  );
}
