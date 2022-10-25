import { initializeApp, getApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

import { config } from "./config";

export function initialize() {
  const firebaseApp = initializeApp(config.firebase);
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  return { firebaseApp, auth, firestore };
}

// function connectToEmulators({ firebaseApp, auth, firestore }) {
//   if (window.location.hostname === "localhost") {
//     connectAuthEmulator(auth, "http://localhost:9099");
//     //, {disableWarnings: true,}
//     connectFirestoreEmulator(firestore, "localhost", 8088);
//   }
//   return { firebaseApp, auth, firestore };
// }

// function enableOffline({ firestore, firebaseApp, auth }) {
//   enableMultiTabIndexedDbPersistence(firestore);
//   return { firestore, firebaseApp, auth };
// }

// export function getFirebase() {
//   const existingApp = getApps().at(0);
//   console.log(getApps());
//   if (existingApp) return initialize();
//   const services = connectToEmulators(initialize());
//   return enableOffline(services);
// }

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

  return { firebaseApp, auth, firestore };
}

function connectToEmulators({ firebaseApp, auth, firestore }) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(firestore, "127.0.0.1", 8088);
  return { firebaseApp, auth, firestore };
}
if (window.location.hostname === "localhost") {
  connectToEmulators(getFirebase());
}
