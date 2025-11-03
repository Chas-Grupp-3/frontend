export const getStatusIndicators = (
  delivered: boolean,
  tempValue: number,
  humidityValue: number,
  arrivalDate: string,
  thresholds: {
    maxTemp: number;
    minTemp: number;
    maxHumidity: number;
    minHumidity: number;
  }
) => {
  const { maxTemp, minTemp, maxHumidity, minHumidity } = thresholds;

  if (delivered) {
    return {
      icon: "package" as const,
      label: "Delivered",
      status: undefined,
      pin: null,
    };
  }
  if (tempValue >= maxTemp) {
    return {
      icon: "tempWarning" as const,
      label: "Warning",
      status: "Temperature Exceeded",
      pin: "red",
    };
  }
  if (humidityValue >= maxHumidity) {
    return {
      icon: "tempWarning" as const,
      label: "Warning",
      status: "Humidity Exceeded",
      pin: "red",
    };
  }
  if (tempValue <= minTemp) {
    return {
      icon: "tempWarning" as const,
      label: "Warning",
      status: "Temperature Below Minimum",
      pin: "red",
    };
  }
  if (humidityValue <= minHumidity) {
    return {
      icon: "tempWarning" as const,
      label: "Warning",
      status: "Humidity Below Minimum",
      pin: "red",
    };
  }
  if (!delivered && arrivalDate < new Date().toISOString()) {
    return {
      icon: "clock" as const,
      label: "Late",
      status: "Delivery Overdue",
      pin: "yellow",
    };
  }
  return {
    icon: "truckRight" as const,
    label: "On Time",
    status: undefined,
    pin: "green",
  };
};

export const formattedTemperature = (tempValue: string) =>
  Number.isFinite(Number(tempValue))
    ? `${Number(tempValue).toFixed(1)}°C`
    : "N/A";
