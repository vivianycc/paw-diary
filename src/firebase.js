import { initializeApp, getApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";

import { config } from "./config";

export function getFirebase() {
  function createFirebaseApp(config) {
    try {
      return getApp();
    } catch {
      return initializeApp(config);
    }
  }
  const firebaseApp = createFirebaseApp(config.firebase);

  const auth = getAuth(firebaseApp);

  const firestore = getFirestore(firebaseApp);

  const storage = getStorage(firebaseApp);

  return { firebaseApp, auth, firestore, storage };
}

function connectToEmulators({ firebaseApp, auth, firestore, storage }) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(firestore, "127.0.0.1", 8088);
  connectStorageEmulator(storage, "127.0.0.1", 9199);
  return { firebaseApp, auth, firestore };
}
if (window.location.hostname === "localhost") {
  connectToEmulators(getFirebase());
}
