"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ErrorClientWrapper({
  error,
  redirectTo,
}: {
  error: string | null;
  redirectTo: string | undefined;
}) {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && error) {
      toast.error(error);
      if (redirectTo) router.push(redirectTo);
    }
  }, [hasMounted, error]);

  return null;
}
