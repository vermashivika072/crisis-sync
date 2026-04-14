import { ref, push, update, onValue, get } from "firebase/database";
import { db } from "./firebase";
import { Incident } from "@/types";

export const createIncident = async (
  incident: Omit<Incident, "id" | "createdAt" | "updatedAt">
) => {
  const incidentsRef = ref(db, "incidents");
  const newIncident = {
    ...incident,
    status: "active",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  const result = await push(incidentsRef, newIncident);
  return result.key;
};

export const updateIncident = async (
  incidentId: string,
  updates: Partial<Incident>
) => {
  const incidentRef = ref(db, `incidents/${incidentId}`);
  await update(incidentRef, {
    ...updates,
    updatedAt: Date.now(),
  });
};

export const getActiveIncidents = async () => {
  const incidentsRef = ref(db, "incidents");
  const snapshot = await get(incidentsRef);
  if (!snapshot.exists()) return [];
  const data = snapshot.val();
  return Object.entries(data)
    .map(([id, val]: any) => ({ id, ...val }))
    .filter((i) => i.status === "active");
};

export const listenToIncidents = (
  callback: (incidents: Incident[]) => void
) => {
  const incidentsRef = ref(db, "incidents");
  return onValue(incidentsRef, (snapshot) => {
    if (!snapshot.exists()) return callback([]);
    const data = snapshot.val();
    const incidents = Object.entries(data).map(([id, val]: any) => ({
      id,
      ...val,
    }));
    callback(incidents);
  });
};