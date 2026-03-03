import { api } from "@/utils/api";

export const getUnavailableSeats = (showId: string) =>
  api(`/booked-seats/${showId}`);