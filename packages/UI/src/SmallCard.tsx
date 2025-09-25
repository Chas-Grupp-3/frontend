import React from "react";

type CardProps = {
  title: string;
  temperature: number;
  status: string;
  id: string;
};

const SmallCard = ({ title, temperature, status, id }: CardProps) => {
  return (
    <div
      style={{
        width: "300px",
        height: "300px",
        backgroundColor: "violet",
        padding: "5px",
        borderRadius: "20px",
        margin: "20px",
      }}
    >
      <h1>{title}</h1>
      <p>{temperature}¨C</p>
      <p>{status}</p>
      <p>ID: {id}</p>
    </div>
  );
};

export default SmallCard;
