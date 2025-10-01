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
        ...styles.card, color:`${colors.cardText}`,
        backgroundColor: getCardColor(DeliveryStatus, temperature, threshold),
      }}
    >
      <div style={styles.cardBox}>
        <div style={styles.leftColumn}>
          <h1>{title}</h1>
          <p>{temperature}°</p>
        </div>
        <div style={styles.rightColumn}>
          <p>{getStatusText(DeliveryStatus, temperature, threshold)}</p>
          <p>ETA: {ETA}</p>
          <p>ID: {id}</p>
        </div>
      </div>
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
  cardBox: {
    display: "flex",
    justifyContent: "center",
    gap: 150,
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 3,
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 3,
},
};
