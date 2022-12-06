export function toASCIIString(str: string): string {
  return str
    .toLowerCase()
    .replace(/[éèêë]/g, 'e')
    .replace(/[ùüûú]/g, 'u')
    .replace(/[ïîìí]/g, 'i')
    .replace(/[öôòó]/g, 'o')
    .replace(/[àäâá]/g, 'a')
    .replace(/[ç]/g, 'c')
    .replace(/[\s\n\r]+/g, '-')
    .replace(/[^a-z0-9\-]/g, '-')
    .replace(/-[\-]+/g, '-')
    .replace(/[\-]+$/g, '')
    .replace(/^[\-]+/g, '');
}
