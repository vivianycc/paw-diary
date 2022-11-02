import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getFirebase } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import RadioButton from "../components/RadioButton";
import Button from "../components/Button";
import Input from "../components/Input";

const StyledPage = styled.div`
  padding: 24px;
  form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .avatar {
    height: 72px;
    width: 72px;
    border-radius: 100%;
    background-color: var(--neutral-300);
  }
`;

export default function CreatePetPage() {
  const [form, setForm] = useState({
    name: "",
    species: "",
    breed: "",
    birthday: "",
    neutered: "",
    chipNumber: "",
    sex: "",
  });
  const navigate = useNavigate();
  const { firestore } = getFirebase();
  const { user } = useAuth();

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPet(form);
    navigate("/profile");
  };
  const handleCancel = () => {
    navigate("/profile");
  };

  const createPet = async (data) => {
    const petRef = doc(firestore, "users", user.uid, "pets", form.name);
    const docRef = await setDoc(petRef, data);
  };

  const { name, breed, species, birthday, neutered, chipNumber, sex } = form;
  return (
    <StyledPage>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="avatar"></div>
        </div>

        <Input
          label="名字"
          name="name"
          value={name}
          onChange={handleInput}
          placeholder="請輸入名字"
          required
        />
        <RadioButton.Group>
          <RadioButton
            label="貓"
            name="species"
            value="cat"
            onChange={handleInput}
            checked={species === "cat"}
            required
          />

          <RadioButton
            label="狗"
            name="species"
            id="dog"
            value="dog"
            checked={species === "dog"}
            onChange={handleInput}
            required
          />
        </RadioButton.Group>

        <Input
          label="品種"
          name="breed"
          value={breed}
          onChange={handleInput}
          placeholder="請輸入品種"
        />

        <RadioButton.Group>
          <RadioButton
            label="公"
            name="sex"
            value="male"
            checked={sex === "male"}
            onChange={handleInput}
            required
          />

          <RadioButton
            label="母"
            name="sex"
            id="female"
            value="female"
            checked={sex === "female"}
            onChange={handleInput}
            required
          />
        </RadioButton.Group>

        <Input
          label="出生日期"
          type="date"
          name="birthday"
          value={birthday}
          onChange={handleInput}
        />
        <RadioButton.Group>
          <RadioButton
            label="已結紮"
            name="neutered"
            value={true}
            checked={!!neutered}
            onChange={handleInput}
          />
          <RadioButton
            label="未結紮"
            name="neutered"
            value={false}
            checked={!!neutered}
            onChange={handleInput}
          />
        </RadioButton.Group>

        <Input
          label="晶片號碼"
          name="chipNumber"
          value={chipNumber}
          onChange={handleInput}
          placeholder="請輸入晶片號碼"
        />

        <Button label="送出" type="submit" />
        <Button label="取消變更" onClick={handleCancel} variant="secondary" />
      </form>
    </StyledPage>
  );
}
