export type CardInfo = {
  id: number;
  title: string;
  temperature: number;
  deliveryStatus: "delivered" | "on time" | "late";
  ETA?: string;
  packageId: string;
  threshold: number;
};

export type BackendPackage = {
  package_id: number;
  driver_id?: string;
  sender_id?: string;
  arrival_date?: string;
  date?: string;
  delivered?: boolean;
  humidity?: string;
  temperature?: string;
  location?: string;
};
