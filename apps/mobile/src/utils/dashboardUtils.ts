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
    (card) => card.temperature > card.threshold
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
        ? cards.filter((card) => card.temperature > card.threshold)
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

export const mockCards: CardInfo[] = [
  {
    id: 0,
    title: "Game of Cones",
    temperature: 8,
    deliveryStatus: "delivered",
    ETA: "19 Dec kl. 10.15",
    packageId: "Y67X093A3",
    threshold: 14,
  },
  {
    id: 1,
    title: "The Codfather",
    temperature: 8,
    deliveryStatus: "on time",
    ETA: "19 Dec kl. 10.45",
    packageId: "Y67X093A4",
    threshold: 14,
  },
  {
    id: 2,
    title: "Frost and Found",
    temperature: 18,
    deliveryStatus: "delivered",
    ETA: "19 Dec kl. 11.10",
    packageId: "Y67X093A5",
    threshold: 14,
  },
  {
    id: 3,
    title: "License to Chill",
    temperature: 8,
    deliveryStatus: "late",
    ETA: "19 Dec kl. 11.30",
    packageId: "Y67X093A6",
    threshold: 14,
  },
  {
    id: 4,
    title: "S´no Problem",
    temperature: 18,
    deliveryStatus: "on time",
    ETA: "19 Dec kl. 11.50",
    packageId: "Y67X093A3",
    threshold: 14,
  },
  {
    id: 5,
    title: "The Big Chillski",
    temperature: 8,
    deliveryStatus: "on time",
    ETA: "19 Dec kl. 12.10",
    packageId: "Y67X093A3",
    threshold: 14,
  },
];
