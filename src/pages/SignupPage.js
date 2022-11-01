import React, { useState } from "react";
import styled from "styled-components";
import LoginSignupForm from "../components/LoginSignupForm";
import { useAuth } from "../hooks/useAuth";
import { setDoc, doc } from "firebase/firestore";
import { getFirebase } from "../firebase";
import { useNavigate } from "react-router-dom";

const StyledPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export default function SignUpPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { signup } = useAuth();

  const { firestore } = getFirebase();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(form.email, form.password)
      .then((user) =>
        setDoc(doc(firestore, "users", user.uid), {
          name: user.displayName,
        })
      )
      .then(() => navigate("/signup/setup"));
  };

  return (
    <StyledPage>
      <LoginSignupForm
        formType="signup"
        email={form.email}
        password={form.password}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </StyledPage>
  );
}
