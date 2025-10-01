import React from "react";
import { colors } from "./styles";
import Text from "./font";

type CardProps = {
  title: string;
  temperature: number;
  DeliveryStatus: "delivered" | "late" | "on time";
  ETA?: string;
  id: string;
  threshold: number;
};

const SmallCard = ({
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
      return colors.critical;
    } else if (DeliveryStatus === "late") {
      return `${colors.minor}`;
    } else if (DeliveryStatus === "delivered") {
      return `${colors.paus}`;
    } else {
      return `${colors.ok}`;
    }
  };

  const getStatusText = (
    DeliveryStatus: "delivered" | "late" | "on time",
    temperature: number,
    threshold: number
  ) => {
    if (temperature >= threshold) {
      return "Temp issues";
    }
    if (DeliveryStatus === "late") {
      return "Late";
    }
    if (DeliveryStatus === "delivered") {
      return "Delivered";
    }
    return "On time";
  };
  return (
    <div
      style={{
        ...styles.card,
        backgroundColor: getCardColor(DeliveryStatus, temperature, threshold),
      }}
    >
      <h1>{title}</h1>
      <p>{temperature}°C</p>
      <p>{getStatusText(DeliveryStatus, temperature, threshold)}</p>
      <p>ETA: {ETA}</p>
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
