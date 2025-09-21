import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function ActivitiesPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 max-w-7xl">
      <Card className="bg-card/30 border-dashed border-2 ">
        <CardHeader className="text-center py-12">
          <CardTitle className="text-muted-foreground text-lg font-medium">
            To be added
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
