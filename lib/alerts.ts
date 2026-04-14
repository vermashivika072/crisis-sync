import { ref, push, update, onValue } from "firebase/database";
import { db } from "./firebase";
import { Alert, UserRole } from "@/types";

export const createAlert = async (
  incidentId: string,
  message: string,
  targetRole: UserRole
) => {
  const alertsRef = ref(db, "alerts");
  const newAlert = {
    incidentId,
    message,
    targetRole,
    read: false,
    createdAt: Date.now(),
  };
  const result = await push(alertsRef, newAlert);
  return result.key;
};

export const markAlertRead = async (alertId: string) => {
  const alertRef = ref(db, `alerts/${alertId}`);
  await update(alertRef, { read: true });
};

export const listenToAlerts = (
  role: UserRole,
  callback: (alerts: Alert[]) => void
) => {
  const alertsRef = ref(db, "alerts");
  return onValue(alertsRef, (snapshot) => {
    if (!snapshot.exists()) return callback([]);
    const data = snapshot.val();
    const alerts = Object.entries(data)
      .map(([id, val]: any) => ({ id, ...val }))
      .filter((a) => a.targetRole === role || a.targetRole === "admin");
    callback(alerts);
  });
};