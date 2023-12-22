export default function useCSSVar<T extends "string" | "number">(
  type: T,
  name: string,
  fallback: T extends "number" ? number : string
): T extends "number" ? number : string {
  if (typeof navigator === "undefined") {
    return fallback;
  }

  const cssValue = getComputedStyle(document.documentElement).getPropertyValue(
    name
  );

  if (type === "string") {
    return cssValue as unknown as T extends "number" ? number : string;
  }

  const numberValue = parseFloat(cssValue);

  if (!Number.isFinite(numberValue)) {
    return fallback;
  }

  return numberValue as unknown as T extends "number" ? number : string;
}
