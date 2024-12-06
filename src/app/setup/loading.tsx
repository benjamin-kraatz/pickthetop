import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function Loading() {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <div className="h-6 w-32 animate-pulse rounded-md bg-muted" />
        </CardHeader>
        <div className="h-16 w-32 animate-pulse rounded-md bg-muted" />
      </CardContent>
    </Card>
  );
}
