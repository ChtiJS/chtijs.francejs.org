export function fixText(text: string): string {
  return text.replace(/\s!/g, "\xa0!").replace(/\s\?/g, "\xa0?");
}
