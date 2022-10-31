import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import Logotype from "../assets/logotype.svg";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px;
  width: 100%;

  img {
    width: 40vw;
    padding: 24px;
    margin: 0 auto;
  }

  p {
    font-size: 14px;
    color: var(--neutral-500);
    text-align: center;
  }
`;

export default function LoginSignupForm({
  email,
  password,
  onChange,
  onSubmit,
  formType = "signup",
}) {
  return (
    <StyledForm onSubmit={onSubmit}>
      <img src={Logotype} alt="logotype" />
      <Input
        label="電子信箱"
        name="email"
        placeholder="請輸入電子信箱"
        onChange={onChange}
        value={email}
      />
      <Input
        label="密碼"
        name="password"
        placeholder="請輸入電子信箱"
        type="password"
        onChange={onChange}
        value={password}
      />
      <Button
        type="submit"
        label={formType === "login" ? "登入" : "建立帳號"}
      />
      {formType === "login" ? (
        <p>
          尚未建立帳號？前往<Link to="/signup">建立帳號</Link>
        </p>
      ) : (
        <p>
          已有帳號？前往<Link to="/login">登入</Link>
        </p>
      )}
    </StyledForm>
  );
}
