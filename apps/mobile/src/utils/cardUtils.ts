import type { CardInfo, BackendPackage } from "../types/packageTypes";
import { colors } from "@chas/ui";

export const TEMPERATURE_THRESHOLDS = {
  min: 7,
  max: 14,
};

export const HUMIDITY_THRESHOLDS = {
  min: 7,
  max: 14,
};

export type IssueType =
  | "temp_too_hot"
  | "temp_too_cold"
  | "humidity_too_high"
  | "humidity_too_low"
  | "delivered"
  | "late"
  | "on_time";

export const getCardIssues = (
  deliveryStatus: "delivered" | "late" | "on time",
  temperature: number,
  humidity: number
): IssueType[] => {
  if (deliveryStatus === "delivered") {
    return ["delivered"];
  }

  const issues: IssueType[] = [];

  if (temperature > TEMPERATURE_THRESHOLDS.max) {
    issues.push("temp_too_hot");
  } else if (temperature < TEMPERATURE_THRESHOLDS.min) {
    issues.push("temp_too_cold");
  }

  if (humidity > HUMIDITY_THRESHOLDS.max) {
    issues.push("humidity_too_high");
  } else if (humidity < HUMIDITY_THRESHOLDS.min) {
    issues.push("humidity_too_low");
  }

  if (issues.length === 0) {
    if (deliveryStatus === "late") {
      issues.push("late");
    } else {
      issues.push("on_time");
    }
  }

  return issues;
};

export const getCardColor = (issues: IssueType[]) => {
  if (issues.includes("delivered")) {
    return {
      backgroundColor: colors.pause,
      textColor: "cardText" as keyof typeof colors,
    };
  }

  if (
    issues.includes("temp_too_hot") ||
    issues.includes("temp_too_cold") ||
    issues.includes("humidity_too_high") ||
    issues.includes("humidity_too_low")
  ) {
    return {
      backgroundColor: colors.critical,
      textColor: "accent" as keyof typeof colors,
    };
  }

  if (issues.includes("late")) {
    return {
      backgroundColor: colors.minor,
      textColor: "cardText" as keyof typeof colors,
    };
  }

  return {
    backgroundColor: colors.ok,
    textColor: "cardText" as keyof typeof colors,
  };
};

export const getStatusText = (issues: IssueType[]): string => {
  if (issues.includes("delivered")) return "Delivered";

  if (issues.includes("temp_too_hot")) return "Too Hot";
  if (issues.includes("temp_too_cold")) return "Too Cold";
  if (issues.includes("humidity_too_high")) return "Humidity High";
  if (issues.includes("humidity_too_low")) return "Humidity Low";
  if (issues.includes("late")) return "Late";

  return "On time";
};

export const sortCardsByPriority = (cards: CardInfo[]): CardInfo[] => {
  return cards.sort((a, b) => {
    const aIssues = getCardIssues(a.deliveryStatus, a.temperature, a.humidity);
    const bIssues = getCardIssues(b.deliveryStatus, b.temperature, b.humidity);

    const getPriority = (issues: IssueType[]): number => {
      if (
        issues.includes("temp_too_hot") ||
        issues.includes("temp_too_cold") ||
        issues.includes("humidity_too_high") ||
        issues.includes("humidity_too_low")
      )
        return 1;
      if (issues.includes("late")) return 2;
      if (issues.includes("delivered")) return 3;
      return 4;
    };

    return getPriority(aIssues) - getPriority(bIssues);
  });
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

export const getHardcodedCards = (): CardInfo[] => {
  const baseDate = new Date();
  const futureDate = new Date(baseDate.getTime() + 24 * 60 * 60 * 1000);
  const pastDate = new Date(baseDate.getTime() - 24 * 60 * 60 * 1000);

  return [
    {
      id: 1001,
      title: "Sender A",
      temperature: 18,
      humidity: 10,
      deliveryStatus: "on time",
      ETA: formatDate(futureDate.toISOString()),
      packageId: "PKG-1001",
      threshold: TEMPERATURE_THRESHOLDS.max,
    },
    {
      id: 1002,
      title: "Sender B",
      temperature: 4,
      humidity: 10,
      deliveryStatus: "on time",
      ETA: formatDate(futureDate.toISOString()),
      packageId: "PKG-1002",
      threshold: TEMPERATURE_THRESHOLDS.min,
    },
    {
      id: 1003,
      title: "Sender C",
      temperature: 10,
      humidity: 18,
      deliveryStatus: "on time",
      ETA: formatDate(futureDate.toISOString()),
      packageId: "PKG-1003",
      threshold: HUMIDITY_THRESHOLDS.max,
    },
    {
      id: 1004,
      title: "Sender D",
      temperature: 10,
      humidity: 4,
      deliveryStatus: "on time",
      ETA: formatDate(futureDate.toISOString()),
      packageId: "PKG-1004",
      threshold: HUMIDITY_THRESHOLDS.min,
    },
    {
      id: 1005,
      title: "Sender E",
      temperature: 10,
      humidity: 10,
      deliveryStatus: "on time",
      ETA: formatDate(futureDate.toISOString()),
      packageId: "PKG-1005",
      threshold: 10,
    },
    {
      id: 1006,
      title: "Sender F",
      temperature: 10,
      humidity: 10,
      deliveryStatus: "late",
      ETA: formatDate(pastDate.toISOString()),
      packageId: "PKG-1006",
      threshold: 10,
    },
    {
      id: 1007,
      title: "Sender G",
      temperature: 10,
      humidity: 10,
      deliveryStatus: "delivered",
      ETA: formatDate(pastDate.toISOString()),
      packageId: "PKG-1007",
      threshold: 10,
    },
  ];
};

export const mapBackendPackageToCardInfo = (pkg: BackendPackage): CardInfo => {
  console.log("Mapping package:", pkg);
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

  const threshold = 10;

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
