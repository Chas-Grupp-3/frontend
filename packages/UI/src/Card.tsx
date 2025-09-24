import React from "react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};
const Card = ({ children, onClick }: Props) => {
  return <div onClick={onClick}>{children}</div>;
};

export default Card;
