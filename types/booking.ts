import { Address } from "./user";

export type Booking = {
  _id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  scheduledAt: Date;
  status: "Scheduled" | "Completed" | "Cancelled";
  address: Address;
  notes?: string;
  createdAt: Date;
};
