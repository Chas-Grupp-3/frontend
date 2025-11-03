import type { CardInfo, BackendPackage } from "../types/packageTypes";
import { colors } from "@chas/ui";

export const TEMPERATURE_THRESHOLDS = {
  min: 15,
  max: 34,
} as const;

export const HUMIDITY_THRESHOLDS = {
  min: 21,
  max: 23,
} as const;

export type IssueType =
  | "temp_issues"
  | "humidity_issues"
  | "delivery_late"
  | "delivered"
  | "all_good";

export const getCardIssues = (card: CardInfo): IssueType[] => {
  const issues: IssueType[] = [];

  if (card.deliveryStatus === "delivered") {
    issues.push("delivered");
    return issues;
  }

  if (typeof card.temperature === "number" && !isNaN(card.temperature)) {
    if (
      card.temperature > TEMPERATURE_THRESHOLDS.max ||
      card.temperature < TEMPERATURE_THRESHOLDS.min
    ) {
      console.log(
        `Temperature issue for ${card.title}: ${card.temperature}°C (threshold: ${TEMPERATURE_THRESHOLDS.min}-${TEMPERATURE_THRESHOLDS.max}°C)`
      );
      issues.push("temp_issues");
    }
  }

  if (typeof card.humidity === "number" && !isNaN(card.humidity)) {
    if (
      card.humidity > HUMIDITY_THRESHOLDS.max ||
      card.humidity < HUMIDITY_THRESHOLDS.min
    ) {
      console.log(
        `Humidity issue for ${card.title}: ${card.humidity}% (threshold: ${HUMIDITY_THRESHOLDS.min}-${HUMIDITY_THRESHOLDS.max}%)`
      );
      issues.push("humidity_issues");
    }
  }

  if (card.deliveryStatus === "late") {
    issues.push("delivery_late");
  }

  if (issues.length === 0) {
    issues.push("all_good");
  }

  return issues;
};

const ISSUE_PRIORITY: Record<IssueType, number> = {
  temp_issues: 1,
  humidity_issues: 1,
  delivery_late: 2,
  all_good: 3,
  delivered: 4,
};

export const sortCardsByPriority = (cards: CardInfo[]): CardInfo[] => {
  return [...cards].sort((a, b) => {
    const aIssues = getCardIssues(a);
    const bIssues = getCardIssues(b);

    const aHighestPriority = Math.min(
      ...aIssues.map((issue) => ISSUE_PRIORITY[issue])
    );
    const bHighestPriority = Math.min(
      ...bIssues.map((issue) => ISSUE_PRIORITY[issue])
    );

    return aHighestPriority - bHighestPriority;
  });
};

export const getCardColor = (card: CardInfo) => {
  const issues = getCardIssues(card);

  console.log(
    "Card:",
    card.title,
    "Temperature:",
    card.temperature,
    "Humidity:",
    card.humidity,
    "Issues:",
    issues
  );

  if (issues.includes("delivered")) {
    return {
      backgroundColor: colors.pause,
      textColor: "cardText" as keyof typeof colors,
    };
  }

  if (issues.includes("temp_issues") || issues.includes("humidity_issues")) {
    return {
      backgroundColor: colors.critical,
      textColor: "accent" as keyof typeof colors,
    };
  }

  if (issues.includes("delivery_late")) {
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

export const getStatusText = (card: CardInfo): string => {
  const issues = getCardIssues(card);

  if (issues.includes("delivered")) {
    return "Delivered";
  }

  if (issues.includes("temp_issues")) {
    if (card.temperature > TEMPERATURE_THRESHOLDS.max) {
      return `Temp issues (${card.temperature}°C)`;
    } else {
      return `Temp issues(${card.temperature}°C)`;
    }
  }

  if (issues.includes("humidity_issues")) {
    if (typeof card.humidity === "number" && !isNaN(card.humidity)) {
      if (card.humidity > HUMIDITY_THRESHOLDS.max) {
        return `Humidity issues (${card.humidity}%)`;
      } else {
        return `Humidity issues (${card.humidity}%)`;
      }
    }
  }

  if (issues.includes("delivery_late")) {
    return "Late";
  }

  return "On time";
};

export const getCardColorLegacy = (
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

export const getStatusTextLegacy = (
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
  if (value === undefined || value === null || value === "") return undefined;
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

  const temperature = parseNumber(pkg.temperature);
  const humidity = parseNumber(pkg.humidity);

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

  const threshold = pkg.thresholds?.maxTemp ?? TEMPERATURE_THRESHOLDS.max;

  const cardInfo: CardInfo = {
    id,
    title,
    temperature: temperature ?? NaN,
    humidity: humidity,
    deliveryStatus,
    ETA,
    packageId,
    threshold,
  };

  return cardInfo;
};
