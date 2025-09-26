import React from "react";

type CardProps = {
  title: string;
  temperature: number;
  status: string;
  id: string;
};

const SmallCard = ({ title, temperature, status, id }: CardProps) => {
  return (
    <div style={styles.card}>
      <h1>{title}</h1>
      <p>{temperature}¨C</p>
      <p>{status}</p>
      <p>ID: {id}</p>
    </div>
  );
};

export default SmallCard;

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
