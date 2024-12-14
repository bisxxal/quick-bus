import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertUTCToLocal(utcTimestamp: string): string { 
  const utcDate: Date = new Date(utcTimestamp);
 
  return utcDate.toLocaleString();
}
 