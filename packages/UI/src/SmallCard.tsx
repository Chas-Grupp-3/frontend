import React from "react";

type CardProps = {
  title: string;
  temperature: number;
  id: string;
};

const SmallCard = ({ title, temperature, id }: CardProps) => {
  return (
    <div
      style={{
        width: "100px",
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

export default SmallCard;
