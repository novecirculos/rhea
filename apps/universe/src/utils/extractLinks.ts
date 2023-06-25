export function extractLinks(markdown: string, aliases: string[]) {
  const regex = /\[\[(.*?)\]\]/g
  const concepts = []
  let match

  while ((match = regex.exec(markdown)) !== null) {
    concepts.push({
      Name: match[1],
      Difficulty: 1,
    })
  }

  aliases.forEach((alias) => {
    concepts.push({
      Name: alias,
      Difficulty: 1,
    })
  })

  return concepts
}
