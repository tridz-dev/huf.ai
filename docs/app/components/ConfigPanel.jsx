export function ConfigPanel({ title, children }) {
  return (
    <div className="huf-config-panel">
      {title && <div className="huf-config-panel-header">{title}</div>}
      <div className="huf-config-panel-body">{children}</div>
    </div>
  )
}

export function ConfigField({ label, value, children }) {
  return (
    <div className="huf-config-field">
      <span className="huf-config-field-label">{label}</span>
      <span className="huf-config-field-value">{value || children}</span>
    </div>
  )
}

export function ConfigSection({ title, children }) {
  return (
    <div className="huf-config-section">
      {title && <div className="huf-config-section-title">{title}</div>}
      {children}
    </div>
  )
}
