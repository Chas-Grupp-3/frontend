export type CardInfo = {
  id: number;
  title: string;
  temperature: number;
  deliveryStatus: "delivered" | "on time" | "late";
  ETA?: string;
  packageId: string;
  threshold: number;
};
