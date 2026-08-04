'use client'

import { useEffect, useId, useState } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#FBFCFA',
    primaryTextColor: '#15181C',
    primaryBorderColor: '#D7DACF',
    lineColor: '#5A636F',
    secondaryColor: '#E9EBE4',
    tertiaryColor: '#F2F3EF',
    fontFamily: 'Archivo, sans-serif',
    fontSize: '16px'
  },
  flowchart: {
    useMaxWidth: false,
    htmlLabels: true,
    curve: 'basis'
  },
  sequence: {
    useMaxWidth: false
  },
  gantt: {
    useMaxWidth: false
  }
})

export function Mermaid({ children }) {
  const id = useId().replace(/:/g, '-')
  const [svg, setSvg] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setError(null)

    mermaid
      .render(`mermaid-${id}`, children.trim())
      .then(({ svg }) => {
        if (!cancelled) setSvg(svg)
      })
      .catch((err) => {
        if (!cancelled) {
          setSvg('')
          setError(err?.message || 'Failed to render diagram')
        }
      })

    return () => { cancelled = true }
  }, [children, id])

  if (error) {
    return (
      <div className="huf-mermaid huf-mermaid--error" role="alert">
        <pre>{children.trim()}</pre>
        <p>Diagram failed to render: {error}</p>
      </div>
    )
  }

  return (
    <div
      className="huf-mermaid"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
