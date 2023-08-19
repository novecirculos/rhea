export function extractLinks(
  markdown: string,
  idMapping: Record<string, string>
) {
  const regex = /\[\[(.*?)\]\]/g
  const links = []
  let match

  while ((match = regex.exec(markdown)) !== null) {
    const name = match[1]
    const id = idMapping[name] || null

    links.push({
      name,
      id,
    })
  }

  return links
}
