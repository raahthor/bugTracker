"use client";

import { useParams } from "next/navigation";

export default function User() {
  const params = useParams<{ user: string }>();
  console.log(params);
  return <div>User: {params.user}</div>;
}
