import React, { useState } from "react";
import styled from "styled-components";
import Input from "../components/Input";
import RadioButton from "../components/RadioButton";
import Button from "../components/Button";
import { usePets } from "../hooks/usePets";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const StyledPage = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  padding: 32px;
  h1 {
    margin-bottom: 80px;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
  }
`;

const Step0 = ({ handleChange, formData: { name, species } }) => {
  return (
    <>
      <Input
        label="名字"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="請輸入名字"
        required
      />
      <RadioButton.Group>
        <RadioButton
          label="貓"
          name="species"
          value="cat"
          onChange={handleChange}
          checked={species === "cat"}
          required
        />

        <RadioButton
          label="狗"
          name="species"
          id="dog"
          value="dog"
          checked={species === "dog"}
          onChange={handleChange}
          required
        />
      </RadioButton.Group>
    </>
  );
};

const Step1 = ({ handleChange, formData: { sex, birthday } }) => {
  return (
    <>
      <RadioButton.Group>
        <RadioButton
          label="公"
          name="sex"
          value="male"
          checked={sex === "male"}
          onChange={handleChange}
          required
        />

        <RadioButton
          label="母"
          name="sex"
          id="female"
          value="female"
          checked={sex === "female"}
          onChange={handleChange}
          required
        />
      </RadioButton.Group>

      <Input
        label="出生日期"
        type="date"
        name="birthday"
        value={birthday}
        onChange={handleChange}
      />
    </>
  );
};

const LastStep = () => {
  return <div>已完成！</div>;
};

export default function CreateFirstPetPage() {
  const [form, setForm] = useState({
    name: "",
    sex: "",
    birthday: "",
    species: "",
  });
  const [step, setStep] = useState(0);

  const { user } = useAuth();
  const { createPet } = usePets(user.uid);

  const navigate = useNavigate();

  const goToNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const goToPrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPet(form);
    goToNextStep();
  };

  const stepList = [
    <Step0 formData={form} handleChange={handleChange} />,
    <Step1 formData={form} handleChange={handleChange} />,
    <LastStep />,
  ];

  const lastStep = stepList.length - 1;
  const formCompleted = lastStep - 1;

  return (
    <StyledPage>
      <form onSubmit={handleSubmit}>
        <h1>建立寵物資料</h1>
        {stepList[step]}
        {step !== 0 && step !== lastStep && (
          <Button label="上一步" onClick={goToPrevStep} variant="secondary" />
        )}
        {step === lastStep && (
          <Button label="開始使用" onClick={() => navigate("/")} />
        )}
        {step === formCompleted && <Button label="送出" type="submit" />}
        {step < formCompleted && (
          <Button label="下一步" onClick={goToNextStep} />
        )}
      </form>
    </StyledPage>
  );
}
