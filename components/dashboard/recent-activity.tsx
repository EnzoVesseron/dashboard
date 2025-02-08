import { ScrollArea } from "@/components/ui/scroll-area";
import { useActivities } from "@/hooks/use-activities";
import { Skeleton } from "@/components/ui/skeleton";

export function RecentActivity() {
  const { activities, isLoading, formatMessage, formatTimeAgo } = useActivities();

  if (isLoading) {
    return (
      <ScrollArea className="h-[400px]">
        <div className="space-y-4 pr-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  }

  if (!activities.length) {
    return (
      <div className="flex h-[400px] items-center justify-center text-sm text-muted-foreground">
        Aucune activité récente
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4 pr-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-4 rounded-lg border p-3"
          >
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {activity.user.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatMessage(activity)}
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              {formatTimeAgo(activity.createdAt)}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}