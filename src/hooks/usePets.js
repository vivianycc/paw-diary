import { useEffect, useState } from "react";
import { getFirebase } from "../firebase";
import { collection, onSnapshot, doc, setDoc } from "firebase/firestore";

export const usePets = (uid) => {
  const [pets, setPets] = useState(null);

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
  const createPet = async (petInfo) => {
    const petRef = doc(firestore, "users", uid, "pets", petInfo.name);
    const docRef = await setDoc(petRef, petInfo);
  };

  return { pets, currentPet, setCurrentPet, createPet };
};
