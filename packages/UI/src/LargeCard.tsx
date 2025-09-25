import React from "react";

type CardProps = {
  title: string;
  temperature: number;
  id: string;
};

const LargeCard = ({ title, temperature, id }: CardProps) => {
  return (
    <div
      style={{
        width: "150px",
        height: "100px",
        backgroundColor: "violet",
      }}
    >
      <h1>{title}</h1>
      <p>{temperature}¨C</p>
      <p>ID: {id}</p>
    </div>
  );
};

export default LargeCard;
