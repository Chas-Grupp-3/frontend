export type CardInfo = {
  id: number;
  title: string;
  temperature: number;
  humidity: number;
  deliveryStatus: "delivered" | "on time" | "late";
  ETA?: string;
  packageId: string;
  threshold: number;
};

export type BackendPackage = {
  arrival_date: string;
  date: string;
  delivered: boolean;
  destination: {
    address: string;
    latitude: number;
    longitude: number;
  };
  driver_id: string;
  humidity: string;
  location: {
    latitude: number;
    longitude: number;
  };
  package_id: number;
  receiver_id: string;
  sender: string;
  temperature: string;
  thresholds: {
    maxHumidity: number;
    maxTemp: number;
    minHumidity: number;
    minTemp: number;
  };
};
