import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { auth, db } from "./firebase";

export const loginUser = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const registerUser = async (
  email: string,
  password: string,
  role: "guest" | "staff" | "admin"
) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await set(ref(db, `users/${result.user.uid}`), {
    email,
    role,
    createdAt: Date.now(),
  });
  return result.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const getUserRole = async (uid: string) => {
  const snapshot = await get(ref(db, `users/${uid}/role`));
  return snapshot.val();
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};