import type { CardInfo } from "../types/packageTypes";

export type FilterOption = {
  value: "all" | "late" | "Temp issues";
  icon: "package" | "clock" | "tempWarning";
};

export const filterOptions: FilterOption[] = [
  { value: "all", icon: "package" },
  { value: "late", icon: "clock" },
  { value: "Temp issues", icon: "tempWarning" },
];

export const getFilterCounts = (cards: CardInfo[]) => {
  const tempIssuesCount = cards.filter(
    (card) =>
      card.temperature < card.thresholds.minTemp ||
      card.temperature > card.thresholds.maxTemp ||
      (card.humidity !== undefined &&
        (card.humidity < card.thresholds.minHumidity ||
          card.humidity > card.thresholds.maxHumidity))
  ).length;

  return filterOptions.reduce(
    (acc, { value }) => {
      switch (value) {
        case "all":
          acc[value] = cards.length;
          break;
        case "Temp issues":
          acc[value] = tempIssuesCount;
          break;
        default:
          acc[value] = cards.filter(
            (card) => card.deliveryStatus === value
          ).length;
          break;
      }
      return acc;
    },
    {} as Record<FilterOption["value"], number>
  );
};

export const getFilteredCards = (
  cards: CardInfo[],
  selectedFilter: FilterOption["value"],
  searchTerm: string
): CardInfo[] => {
  let filtered =
    selectedFilter === "all"
      ? cards
      : selectedFilter === "Temp issues"
        ? cards.filter(
            (card) =>
              card.temperature < card.thresholds.minTemp ||
              card.temperature > card.thresholds.maxTemp ||
              (card.humidity !== undefined &&
                (card.humidity < card.thresholds.minHumidity ||
                  card.humidity > card.thresholds.maxHumidity))
          )
        : cards.filter((card) => card.deliveryStatus === selectedFilter);

  if (searchTerm.trim() !== "") {
    filtered = filtered.filter(
      (card) =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.packageId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return filtered;
};
