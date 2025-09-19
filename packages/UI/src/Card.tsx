import styled from "styled-components";
import { radius, colors, textMobile, textWeb } from "./styles";
import Text from "./font";

type Props = { children: React.ReactNode; title: string };
const Card = ({ children, title }: Props) => {
  return (
    <div style={{ backgroundColor: "red" }}>
      {title}
      {children}
    </div>
  );
};

export default Card;
