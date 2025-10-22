import { colors } from "@chas/ui";

export const getCardColor = (
  deliveryStatus: "delivered" | "late" | "on time",
  temperature: number,
  threshold: number
) => {
  if (temperature >= threshold) {
    return {
      backgroundColor: colors.critical,
      textColor: "accent" as keyof typeof colors,
    };
  } else if (deliveryStatus === "late") {
    return {
      backgroundColor: colors.minor,
      textColor: "cardText" as keyof typeof colors,
    };
  } else if (deliveryStatus === "delivered") {
    return {
      backgroundColor: colors.pause,
      textColor: "cardText" as keyof typeof colors,
    };
  } else {
    return {
      backgroundColor: colors.ok,
      textColor: "cardText" as keyof typeof colors,
    };
  }
};

export const getStatusText = (
  deliveryStatus: "delivered" | "late" | "on time",
  temperature: number,
  threshold: number
) => {
  if (temperature >= threshold) {
    return "Temp issues";
  }
  if (deliveryStatus === "late") {
    return "Late";
  }
  if (deliveryStatus === "delivered") {
    return "Delivered";
  }
  return "On time";
};
