import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind CSS conditional classnames
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
