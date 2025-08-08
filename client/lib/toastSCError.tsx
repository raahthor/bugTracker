"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ToastSCError({
  error,
}: {
  error: string | null | undefined;
}) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && error) {
      toast.error(error);
    }
  }, [hasMounted, error]);

  return null;
}
