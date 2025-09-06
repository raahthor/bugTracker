"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Buttons() {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.push("/create-org")}>
        Create Organization
      </Button>
      <Button onClick={() => router.push("/join-org")}>
        Join Organization
      </Button>
      <Button variant="outline" onClick={() => router.push("/recover-orgs")}>
        Recover organizations
      </Button>
    </div>
  );
}
