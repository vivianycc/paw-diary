import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import LoginSignupForm from "../components/LoginSignupForm";

const StyledPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  useEffect(() => {
    if (user) {
      navigate(state?.path || "/");
    }
  }, [user]);

  const onSubmit = (data) => {
    const { email, password } = data;
    login(email, password)
      .then(() => navigate(state?.path || "/"))
      .catch((error) => {
        switch (error.code) {
          case "auth/wrong-password":
            alert("密碼錯誤");
            break;
          case "auth/user-not-found":
            alert("使用者不存在");
            break;
          case "auth/invalid-password":
            alert("Password must be at least 6 characters");
            break;
          case "auth/invalid-email":
            return "Email provided is invalid";

          // Many more authCode mapping here...

          default:
            alert(error.message);
            return "";
        }
      });
  };

  return (
    <StyledPage>
      <LoginSignupForm
        formType="login"
        register={register}
        errors={errors}
        isValid={isValid}
        onSubmit={handleSubmit(onSubmit)}
      />
    </StyledPage>
  );
}
