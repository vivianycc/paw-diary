import { useEffect, useState } from "react";
import { getFirebase } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export const usePets = (uid) => {
  const [pets, setPets] = useState([]);

  const [currentPet, setCurrentPet] = useState(null);

  const { firestore } = getFirebase();
  const petCol = collection(firestore, "users", uid, "pets");

  useEffect(() => {
    const unsubscribe = onSnapshot(petCol, (snapshot) => {
      const arr = snapshot.docs.map((doc) => {
        const id = doc.id;
        const data = doc.data();

        return {
          [id]: data,
        };
      });
      const obj =
        arr.length === 0
          ? {}
          : arr.reduce((prev, curr) => ({ ...prev, ...curr }));
      setPets(obj);
      setCurrentPet(Object.keys(obj)[0]);
    });
    return () => {
      unsubscribe();
    };
  }, [uid]);
  // addind `petcol` as suggested in the linter will cause infinite loop

  return { pets, currentPet, setCurrentPet };
};
