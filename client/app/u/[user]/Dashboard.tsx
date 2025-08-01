"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const { user } = useParams();
  useEffect(() => {
    if (user === "null") router.push("/signup");
  }, [user]);

  return <div>{user}</div>;
}