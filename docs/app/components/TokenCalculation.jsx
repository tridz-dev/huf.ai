export function TokenCalculation({ children }) {
  return <div className="huf-token-calc">{children}</div>
}

export function TokenRow({ label, prompt, response, carry = [], total }) {
  const parts = [
    prompt !== undefined && `${prompt} prompt`,
    response !== undefined && `${response} response`,
    ...carry.map(c => `${c} carry`)
  ].filter(Boolean)

  return (
    <div className="huf-token-row">
      <span className="huf-token-label">{label}</span>
      <span className="huf-token-parts">{parts.join(' + ')}</span>
      <span className="huf-token-total">= {total} tokens</span>
    </div>
  )
}

export function TokenNote({ children }) {
  return <div className="huf-token-note">{children}</div>
}
