import { useState, useEffect } from "react";
import { Alert, UserRole } from "@/types";
import { listenToAlerts, markAlertRead } from "@/lib/alerts";

export const useAlerts = (role: UserRole | null) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!role) return;
    const unsubscribe = listenToAlerts(role, (data) => {
      setAlerts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [role]);

  const unreadAlerts = alerts.filter((a) => !a.read);
  const unreadCount = unreadAlerts.length;

  const markRead = async (alertId: string) => {
    await markAlertRead(alertId);
  };

  return { alerts, unreadAlerts, unreadCount, markRead, loading };
};