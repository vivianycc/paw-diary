import styled from "styled-components";
import IconButton from "../components/IconButton";
import { Plus } from "react-feather";

const StyledIconButton = styled(IconButton)`
  position: fixed;
  bottom: 128px;
  right: 32px;
`;
export default function FoodPage() {
  return (
    <div>
      <h1>Food</h1>
      <StyledIconButton size={56} onClick={() => console.log("hi")}>
        <Plus />
      </StyledIconButton>
    </div>
  );
}
