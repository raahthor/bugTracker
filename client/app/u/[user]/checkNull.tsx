"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckNull() {
  const router = useRouter();
  const { user } = useParams();
  useEffect(() => {
    if (user === "null") router.push("/signup");
  }, [user]);

  return <></>;
}
