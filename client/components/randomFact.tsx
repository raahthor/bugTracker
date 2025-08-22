import facts from "@/data/facts.json";
import { useEffect, useState } from "react";

export default function RandomFact() {
  const [fact, setFact] = useState("");
  useEffect(() => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    setFact(randomFact);
  }, []);

  return (
    <div className="min-h-14 mb-1 px-2 py-1 rounded-md border">
      <p className="font-semibold">Random Fact 🐞</p>
      <p>{fact || "Loading..."}</p>
    </div>
  );
}
