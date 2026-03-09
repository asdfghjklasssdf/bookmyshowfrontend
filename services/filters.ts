import { api } from "@/utils/api";

export const filterShows = async (query: string) => {
  return api(`/filters/shows${query}`);
};