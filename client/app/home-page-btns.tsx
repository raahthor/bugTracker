"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useRouter } from "next/navigation";

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
  return (
    <Button size="lg">
      <ExternalLink className="mr-2 h-5 w-5" />
      View Live Demo
    </Button>
  );
}
export function ViewCodeButtonLG() {
  return (
    <Button size="lg" variant="outline">
      <Github className="mr-2 h-5 w-5" />
      View Source on GitHub
    </Button>
  );
}
