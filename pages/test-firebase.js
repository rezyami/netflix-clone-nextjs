import { useEffect } from "react";
import { getApps } from "firebase/app";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function TestFirebase() {
  useEffect(() => {
    console.log("✅ Firebase apps:", getApps());

    // check if auth works
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("🔥 User is logged in:", user.email);
      } else {
        console.log("👋 No user logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  return <div style={{ padding: 20 }}>Check your console for Firebase test results.</div>;
}
