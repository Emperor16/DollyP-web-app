/**
 * Safely converts any unknown API response or value into a guaranteed array.
 * Prevents runtime crashes from .map(), .filter(), or .reduce() on null/undefined/non-array data.
 * 
 * @param value - The raw data coming from an API response
 * @returns An array (either the original if valid, or an empty array [])
 */
export const safeArray = <T>(value: unknown): T[] => {
  if (Array.isArray(value)) {
    return value as T[];
  }
  return [];
};