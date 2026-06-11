export function AgentPrompt({ title, children }) {
  return (
    <div className="huf-prompt">
      <div className="huf-prompt-header">
        <span className="huf-prompt-label">Agent Instructions</span>
        {title && <span className="huf-prompt-title">{title}</span>}
      </div>
      <div className="huf-prompt-body">{children}</div>
    </div>
  )
}
