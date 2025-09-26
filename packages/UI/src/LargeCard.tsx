import React from "react";

type CardProps = {
  title: string;
  temperature: number;
  status: string;
  ETA: string;
  id: string;
};

const LargeCard = ({ title, temperature, status, ETA, id }: CardProps) => {
  return (
    <div style={styles.card}>
      <h1>{title}</h1>
      <p>{temperature}¨C</p>
      <p>{status}</p>
      <p>{ETA}</p>
      <p>ID: {id}</p>
    </div>
  );
};

export default LargeCard;

const styles = {
  card: {
    width: 500,
    height: 300,
    backgroundColor: "violet",
    padding: 5,
    borderRadius: 20,
    margin: 20,
  },
};
