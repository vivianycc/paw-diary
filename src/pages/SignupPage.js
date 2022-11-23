import React, { useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { setDoc, doc } from "firebase/firestore";
import { getFirebase } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoginSignupForm from "../components/LoginSignupForm";

const StyledPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export default function SignUpPage() {
  const { signup, user } = useAuth();
  const { firestore } = getFirebase();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const onSubmit = (data) => {
    const { email, password } = data;
    signup(email, password)
      .then((user) =>
        setDoc(doc(firestore, "users", user.uid), {
          name: user.displayName,
        })
      )
      .then(() => navigate("/pets/create"));
  };

  return (
    <StyledPage>
      <LoginSignupForm
        formType="signup"
        register={register}
        errors={formState.errors}
        onSubmit={handleSubmit(onSubmit)}
      />
    </StyledPage>
  );
}
