export function ToolCallResult({ call, result, language = 'python' }) {
  return (
    <div className="huf-tool-call">
      <div className="huf-tool-call-panel huf-tool-call-panel--call">
        <div className="huf-tool-call-label">Agent Call</div>
        <pre className="huf-tool-call-code">
          <code>{call}</code>
        </pre>
      </div>
      {result && (
        <div className="huf-tool-call-panel huf-tool-call-panel--result">
          <div className="huf-tool-call-label">Result</div>
          <pre className="huf-tool-call-code">
            <code>{result}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
