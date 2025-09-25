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
        width: "200px",
        height: "200px",
        backgroundColor: "violet",
        padding: "5px",
        borderRadius: "20px",
        margin: "20px",
      }}
    >
      <h1>{title}</h1>
      <p>{temperature}¨C</p>
      <p>ID: {id}</p>
    </div>
  );
};

export default SmallCard;
