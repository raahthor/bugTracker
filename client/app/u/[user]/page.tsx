"use client";

import { useParams } from "next/navigation";

const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
export default function UserPage() {
  
  const params = useParams<{ user: string }>();
  if (params.user === "null") window.location.href = `${clientUrl}/signup`;

  console.log(params);
  return <div>User: {params.user}</div>;
}
