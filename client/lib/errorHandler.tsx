"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ErrorClientWrapper({
  error,
}: {
  error: string | null;
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
