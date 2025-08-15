import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { SearchList } from "@/types/searchList";
import { Badge } from "@/components/ui/badge";
import router from "next/navigation";
import { Input } from "@/components/ui/input";

export default function SearchCards({ org }: { org: SearchList }) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {org.name}
        </CardTitle>
        <CardDescription>@ {org.handle}</CardDescription>
        <CardDescription>Owner: {org.owner}</CardDescription>
      </CardHeader>
      <CardFooter className="flex items-start gap-2 text-xs">
        <Input placeholder="Invite Code" className="text-sm max-w-100" />
        <Button onClick={() => alert()}>Join</Button>
      </CardFooter>
    </Card>
  );
}
