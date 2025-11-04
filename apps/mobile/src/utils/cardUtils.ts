import type { CardInfo, BackendPackage } from "../types/packageTypes";
import { colors } from "@chas/ui";

export const formatDisplayNumber = (value: number, maxDigits = 2): number => {
  if (!Number.isFinite(value)) return NaN;
  const rounded = Math.round(value);
  const max = 10 ** maxDigits - 1; // e.g. maxDigits=2 -> 99
  const clamped = Math.sign(rounded) * Math.min(Math.abs(rounded), max);
  return clamped;
};

export const getCardColor = (
  deliveryStatus: "delivered" | "late" | "on time",
  temperature: number,
  humidity: number,
  minTemp: number,
  maxTemp: number,
  minHumidity: number,
  maxHumidity: number
) => {
  // Delivered always takes priority
  if (deliveryStatus === "delivered") {
    return {
      backgroundColor: colors.pause,
      textColor: "cardText" as keyof typeof colors,
    };
  }

  // Temperature checks have next priority
  if (temperature < minTemp || temperature > maxTemp) {
    return {
      backgroundColor: colors.critical,
      textColor: "accent" as keyof typeof colors,
    };
  }

  // Humidity checks after temperature
  if (humidity < minHumidity || humidity > maxHumidity) {
    return {
      backgroundColor: colors.critical,
      textColor: "accent" as keyof typeof colors,
    };
  }

  // Late after thresholds
  if (deliveryStatus === "late") {
    return {
      backgroundColor: colors.minor,
      textColor: "cardText" as keyof typeof colors,
    };
  }

  // Default ok
  return {
    backgroundColor: colors.ok,
    textColor: "cardText" as keyof typeof colors,
  };
};

export const getStatusText = (
  deliveryStatus: "delivered" | "late" | "on time",
  temperature: number,
  humidity: number,
  minTemp: number,
  maxTemp: number,
  minHumidity: number,
  maxHumidity: number
) => {
  // Priority 1: Delivered always takes precedence
  if (deliveryStatus === "delivered") {
    return "Delivered";
  }

  // Priority 2: Temperature thresholds
  if (Number.isFinite(temperature) && temperature < minTemp) {
    return "Too cold";
  }
  if (Number.isFinite(temperature) && temperature > maxTemp) {
    return "Too hot";
  }

  // Priority 3: Humidity thresholds
  if (Number.isFinite(humidity) && humidity < minHumidity) {
    return "Too dry";
  }
  if (Number.isFinite(humidity) && humidity > maxHumidity) {
    return "Too humid";
  }

  // Priority 4: Late status
  if (deliveryStatus === "late") {
    return "Late";
  }

  return "On time";
};

const parseNumber = (
  value: string | number | undefined
): number | undefined => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "number") return value;
  const normalized = String(value).trim().replace(",", ".");
  const number = Number(normalized);
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

  const rawTemp = parseNumber(pkg.temperature) ?? NaN;
  const rawHumidity = parseNumber(pkg.humidity) ?? NaN;

  // Format to integers and clamp to max 2 digits for display
  const temperature = formatDisplayNumber(rawTemp, 2); // shows -99..99
  const humidity = formatDisplayNumber(rawHumidity, 2); // shows -99..99

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

  if (!pkg.thresholds) {
    throw new Error("Package thresholds are missing");
  }
  const thresholds = {
    minTemp: parseNumber(pkg.thresholds?.minTemp) ?? NaN,
    maxTemp: parseNumber(pkg.thresholds?.maxTemp) ?? NaN,
    minHumidity: parseNumber(pkg.thresholds?.minHumidity) ?? NaN,
    maxHumidity: parseNumber(pkg.thresholds?.maxHumidity) ?? NaN,
  };

  const cardInfo: CardInfo = {
    id,
    title,
    temperature,
    humidity,
    deliveryStatus,
    ETA,
    packageId,
    thresholds,
  };

  return cardInfo;
};

/**
 * Sort packages so delivered packages appear at the bottom.
 * Within each group (non-delivered and delivered), maintain original order.
 */
export const sortPackages = (cards: CardInfo[]): CardInfo[] => {
  const nonDelivered = cards.filter(
    (card) => card.deliveryStatus !== "delivered"
  );
  const delivered = cards.filter((card) => card.deliveryStatus === "delivered");
  return [...nonDelivered, ...delivered];
};
