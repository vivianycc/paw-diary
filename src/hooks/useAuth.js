import { useState, useEffect, useContext, createContext } from "react";
import { getFirebase } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const { auth } = getFirebase();

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then((res) => {
      setUser(res.user);
      return res.user;
    });
  };

  const logout = () => {
    return signOut(auth).then(() => setUser(false));
  };

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then((res) => {
      setUser(res.user);
      return res.user;
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
  }, []);

  return {
    user,
    login,
    logout,
    signup,
  };
}

//https://usehooks.com/useAuth/
