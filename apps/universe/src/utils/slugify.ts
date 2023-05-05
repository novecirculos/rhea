export function slugify(text: string) {
  text = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f\u00c4-\u00e4]/g, (match) => {
      return match[0] <= '\u036f' ? '' : match.toLowerCase()
    })

  // remove any remaining non-English letters
  text = text.replace(/[^a-zA-Z]/g, ' ')

  // replace multiple spaces with a single hyphen
  text = text.trim().replace(/\s+/g, '-')

  // convert to lowercase
  text = text.toLowerCase()

  return text
}
