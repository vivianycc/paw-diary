import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RadioButton from "../components/RadioButton";
import Button from "../components/Button";
import { getFirebase } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

const StyledPage = styled.div`
  padding: 24px;
  form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  label + input {
    width: 100%;
  }
  input {
    padding: 10px 12px;
    outline: none;
    border: 1px solid var(--neutral-300);
    border-radius: 8px;
  }
  label {
    display: inline-block;
    margin-bottom: 8px;
    font-size: 14px;
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
        <div>
          <label htmlFor="name">名字</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInput}
            placeholder="名字"
            required
          />
        </div>
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

        <div>
          <label htmlFor="breed">品種</label>
          <input
            type="text"
            name="breed"
            value={breed}
            onChange={handleInput}
          />
        </div>
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
        <div>
          <label htmlFor="breed">出生日期</label>
          <input
            type="date"
            name="birthday"
            value={birthday}
            onChange={handleInput}
          />
        </div>
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
        <div>
          <label htmlFor="chipNumber">晶片號碼</label>
          <input
            type="number"
            name="chipNumber"
            value={chipNumber}
            onChange={handleInput}
          />
        </div>
        <Button label="送出" type="submit" />
        <Button
          label="取消變更"
          onClick={handleCancel}
          bgColor="var(--neutral-200)"
          color="var(--neutral-700)"
        />
      </form>
    </StyledPage>
  );
}
