import { useState, useEffect } from "react";
import { ActivityService } from "@/lib/services/activity.service";
import { useSite } from "@/lib/site-context";
import { ActivityWithUser } from "@/types/activity";

export function useActivities() {
  const { currentSite } = useSite();
  const [activities, setActivities] = useState<ActivityWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      try {
        const data = await ActivityService.getRecentActivities(currentSite.id);
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setActivities([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchActivities();
  }, [currentSite.id]);

  return {
    activities,
    isLoading,
    formatMessage: ActivityService.formatMessage,
    formatTimeAgo: ActivityService.formatTimeAgo,
  };
}