/** Strips HTML tags and collapses excess whitespace to reduce stored-XSS risk from free-text fields. */
export function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}
