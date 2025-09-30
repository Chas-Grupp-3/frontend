import React from "react";
import { colors } from "./styles";

type CardProps = {
  title: string;
  temperature: number;
  DeliveryStatus: "delivered" | "late" | "on time";
  ETA?: string;
  id: string;
  threshold: number;
};

const LargeCard = ({
  title,
  temperature,
  DeliveryStatus,
  ETA,
  id,
  threshold,
}: CardProps) => {
  const getCardColor = (
    DeliveryStatus: "delivered" | "late" | "on time",
    temperature: number,
    threshold: number
  ) => {
    if (temperature >= threshold) {
      return `${colors.critical}`;
    } else if (temperature >= 15) {
      return `${colors.minor}`;
    } else {
      return `${colors.ok}`;
    }
  };
  return (
    <div style={{ ...styles.card, backgroundColor: getCardColor(temperature, DeliveryStatus) }}>
      <h1>{title}</h1>
      <p>{temperature}°C</p>
      <p>{DeliveryStatus}</p>
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
    padding: 5,
    borderRadius: 20,
    margin: 20,
  },
};
