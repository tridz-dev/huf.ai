export function Checklist({ items = [] }) {
  return (
    <div className="huf-checklist">
      {items.map((item, i) => (
        <label key={i} className="huf-checklist-item">
          <input type="checkbox" className="huf-checklist-box" readOnly />
          <span className="huf-checklist-text">{item}</span>
        </label>
      ))}
    </div>
  )
}
