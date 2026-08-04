export function DoDont({ doItems = [], dontItems = [] }) {
  return (
    <div className="huf-dodont">
      <div className="huf-dodont-col huf-dodont-col--do">
        <div className="huf-dodont-title">Do</div>
        <ul>
          {doItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="huf-dodont-col huf-dodont-col--dont">
        <div className="huf-dodont-title">Don't</div>
        <ul>
          {dontItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
