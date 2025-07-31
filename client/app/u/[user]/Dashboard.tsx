"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

export default function Dashboard() {
  const { user } = useParams();
  useEffect(() => {
    if (user === "null") window.location.href = `/signup`;
    console.log(user);
  }, [user]);

  return <div>{user}</div>;
}
