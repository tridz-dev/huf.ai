export function ChatTranscript({ children }) {
  return <div className="huf-chat">{children}</div>
}

export function ChatMessage({ role, children, label }) {
  const roleLabels = {
    system: 'System',
    user: 'User',
    agent: 'Agent',
    'tool-call': 'Tool Call',
    'tool-result': 'Tool Result',
    note: 'Note'
  }

  return (
    <div className={`huf-chat-bubble huf-chat-bubble--${role}`}>
      <div className="huf-chat-meta">
        <span className="huf-chat-role">{label || roleLabels[role] || role}</span>
      </div>
      <div className="huf-chat-body">{children}</div>
    </div>
  )
}
