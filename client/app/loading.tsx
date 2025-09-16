"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function Loading() {
  const [progress, setProgress] = useState(10);
  useEffect(() => {
    const timerId = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 5 : prev));
    }, 100);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[9999]">
      <Progress value={progress} className="h-1 top-0 z-10" />
    </div>
  );
}
