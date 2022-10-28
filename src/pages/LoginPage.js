import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import styled from "styled-components";
import { getFirebase } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;

  input {
    padding: 12px 16px;
    border-radius: 12px;
    outline: none;
    border: 1px solid var(--neutral-300);
  }
`;

export default function LoginPage(props) {
  const { logIn, signUp, logOut, user } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form, setForm] = useState({
    email: "hello@tale.app",
    password: "123456",
  });

  const { firestore } = getFirebase();

  useEffect(() => {
    if (user) {
      navigate(state?.path || "/");
    }
  }, [user]);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogIn = () => {
    logIn(form.email, form.password).then(() => navigate(state?.path || "/"));
  };

  const handleSignUp = () => {
    signUp(form.email, form.password)
      .then((user) =>
        setDoc(doc(firestore, "users", user.uid), {
          name: user.displayName,
        })
      )
      .then(() => navigate("/"));
  };

  return (
    <StyledPage>
      <input
        type="email"
        name="email"
        placeholder="電子信箱地址"
        value={form.email}
        onChange={handleInput}
      />
      <input
        type="password"
        name="password"
        placeholder="密碼"
        value={form.password}
        onChange={handleInput}
      />
      <button onClick={handleLogIn}>Sign In</button>
      <button onClick={handleSignUp}>Create Account</button>
      <button onClick={logOut}>log out</button>
      {user && <h1>{user.email}</h1>}
    </StyledPage>
  );
}
