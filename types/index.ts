export type UserRole = "guest" | "staff" | "admin";

export interface User {
  uid: string;
  email: string;
  role: UserRole;
  createdAt: number;
}

export interface Room {
  id: string;
  number: string;
  floor: number;
  guestId?: string;
  status: "vacant" | "occupied";
}

export interface Incident {
  id: string;
  roomId: string;
  roomNumber: string;
  type: "fire" | "medical" | "security" | "evacuation" | "other";
  severity: 1 | 2 | 3;
  status: "active" | "responding" | "resolved";
  reportedBy: string;
  assignedTo?: string;
  description: string;
  createdAt: number;
  updatedAt: number;
}

export interface Alert {
  id: string;
  incidentId: string;
  message: string;
  targetRole: UserRole;
  createdAt: number;
  read: boolean;
}