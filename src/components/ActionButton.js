import styled from "styled-components";
import IconButton from "./IconButton";
import { Plus } from "react-feather";

const StyledIconButton = styled(IconButton)`
  position: fixed;
  bottom: 104px;
  right: 32px;

  @media only screen and (min-width: 625px) {
    position: absolute;
    right: 0;
    bottom: 32px;
  }
`;

export default function ActionButton({ onClick }) {
  return <StyledIconButton size={56} onClick={onClick} icon={<Plus />} />;
}
