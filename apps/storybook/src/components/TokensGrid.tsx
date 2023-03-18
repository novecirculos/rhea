import '../styles/tokens-grid.css'

interface TokensGridProps {
  tokens: Record<string, string>
  hasPxValue?: boolean
  hasRemValue?: boolean
}

export function TokensGrid({
  tokens,
  hasPxValue = false,
  hasRemValue = false,
}: TokensGridProps) {
  return (
    <table className="tokens-grid">
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
          {hasPxValue && <th>Rem</th>}
          {hasRemValue && <th>Px</th>}
        </tr>
      </thead>
      <tbody>
        {Object.entries(tokens).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{value}</td>
            {hasPxValue && (
              <td>{Number(value.replace('px', '')) * 0.0625}rem</td>
            )}
            {hasRemValue && <td>{Number(value.replace('rem', '')) * 16}px</td>}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
