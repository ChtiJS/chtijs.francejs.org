export default function useCSSRemValue(fallbackSize = 16): number {
  if (typeof navigator === "undefined") {
    return fallbackSize;
  }

  return parseFloat(getComputedStyle(document.documentElement).fontSize);
}
