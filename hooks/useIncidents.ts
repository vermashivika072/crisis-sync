import { useState, useEffect } from "react";
import { Incident } from "@/types";
import { listenToIncidents } from "@/lib/incidents";

export const useIncidents = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToIncidents((data) => {
      setIncidents(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const activeIncidents = incidents.filter((i) => i.status === "active");
  const resolvedIncidents = incidents.filter((i) => i.status === "resolved");

  return { incidents, activeIncidents, resolvedIncidents, loading };
};