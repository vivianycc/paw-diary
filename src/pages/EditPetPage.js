import { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { getFirebase } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";
import { useAuth } from "../hooks/useAuth";
import RadioButton from "../components/RadioButton";
import Button from "../components/Button";
import Input from "../components/Input";
import uploadFile from "./uploadFile";
import { useEffect } from "react";

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
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

export default function CreatePetPage() {
  const {
    state: { pet },
  } = useLocation();
  const [form, setForm] = useState({
    photoUrl: pet.photoUrl || "",
    name: pet.name || "",
    species: pet.species || "",
    breed: pet.breed || "",
    birthday: pet.birthday || "",
    neutered: pet.neutered || "",
    chipNumber: pet.chipNumber || "",
    sex: pet.sex || "",
  });

  const [file, setFile] = useState("");

  const navigate = useNavigate();

  console.log("pet from location", pet);
  const { firestore, storage } = getFirebase();
  const { user } = useAuth();

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const createPet = async (data) => {
      const petRef = doc(firestore, "users", user.uid, "pets", form.name);
      setDoc(petRef, data, { merge: true });
    };

    createPet(form);
    navigate("/profile");
  };
  const handleCancel = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const setPhotoUrl = (url) => setForm({ ...form, photoUrl: url });
    if (file) {
      uploadFile(file, `${user.uid}/${form.name}/profile`, setPhotoUrl);
    }
  }, [file]);

  const { name, breed, species, birthday, neutered, chipNumber, sex } = form;
  return (
    <StyledPage>
      <form onSubmit={handleSubmit}>
        <div>
          <div
            className="avatar"
            style={{ backgroundImage: `url(${form.photoUrl})` }}
          ></div>
          <input type="file" accept="image/*" onChange={(e) => handleFile(e)} />
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
