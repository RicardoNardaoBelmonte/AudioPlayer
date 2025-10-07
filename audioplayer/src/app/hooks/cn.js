import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// cn function: combina clsx + tailwind-merge
export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};