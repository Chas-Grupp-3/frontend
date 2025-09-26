import React from "react";

type CardProps = {
  title: string;
  temperature: number;
  status: string;
  id: string;
};

const SmallCard = ({ title, temperature, status, id }: CardProps) => {
  const getCardColor = (temperature: number) => {
    if (temperature >= 20) {
      return "red";
    } else if (temperature >= 15) {
      return "yellow";
    } else {
      return "green";
    }
  };

  return (
    <div style={{ ...styles.card, backgroundColor: getCardColor(temperature) }}>
      <h1>{title}</h1>
      <p>{temperature}°C</p>
      <p>{status}</p>
      <p>ID: {id}</p>
    </div>
  );
};

export default SmallCard;

const styles = {
  card: {
    width: 300,
    height: 300,
    padding: 5,
    borderRadius: 20,
    margin: 20,
  },
};
