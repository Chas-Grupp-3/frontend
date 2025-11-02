import type { CardInfo, BackendPackage } from "../types/packageTypes";
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

const parseNumber = (
  value: string | number | undefined
): number | undefined => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "number") return value;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
};

export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "Currently unavailable";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Currently unavailable";
  return date.toLocaleString("sv-SE", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

export const mapBackendPackageToCardInfo = (pkg: BackendPackage): CardInfo => {
  const id = pkg.package_id;
  const packageId = String(id);

  const temperature = parseNumber(pkg.temperature) ?? NaN;
  const humidity = parseNumber(pkg.humidity) ?? NaN;

  const title = pkg.sender;

  const ETA = formatDate(pkg.arrival_date);

  let deliveryStatus: CardInfo["deliveryStatus"] = "on time";
  if (pkg.delivered === true) {
    deliveryStatus = "delivered";
  } else if (pkg.arrival_date) {
    const arrival = new Date(pkg.arrival_date);
    if (!Number.isNaN(arrival.getTime())) {
      const now = new Date();
      deliveryStatus = arrival < now ? "late" : "on time";
    }
  }

  const threshold = parseNumber(pkg.thresholds?.maxTemp) ?? 5;

  const cardInfo: CardInfo = {
    id,
    title,
    temperature,
    humidity,
    deliveryStatus,
    ETA,
    packageId,
    threshold,
  };

  return cardInfo;
};
