import styled from "styled-components";
import { colors } from "../styles";

const ToggleDivider = () => <Divider />;

const Divider = styled.div`
  width: 2px;
  height: 40px;
  background-color: ${colors.accent};
  margin: 0 4px;
  border-radius: 1px;
`;

export default ToggleDivider;
