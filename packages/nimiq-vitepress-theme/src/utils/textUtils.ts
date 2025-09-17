/**
 * Humanizes text by removing backticks and converting camelCase/snake_case to readable format with proper capitalization
 */
export function humanizeText(text: string): string {
  // Remove backticks
  let result = text.replace(/`/g, '')

  // Convert camelCase to readable format
  // Insert space before uppercase letters that follow lowercase letters
  result = result.replace(/([a-z])([A-Z])/g, '$1 $2')

  // Convert snake_case and kebab-case to readable format
  result = result.replace(/[_-]+/g, ' ')

  // Clean up multiple spaces and trim
  result = result.replace(/\s+/g, ' ').trim()

  // Capitalize each word
  result = result.replace(/\b\w/g, char => char.toUpperCase())

  return result
}
