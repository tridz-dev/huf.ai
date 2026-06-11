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
    fontSize: '13px'
  },
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'basis'
  }
})

export function Mermaid({ children }) {
  const id = useId().replace(/:/g, '-')
  const [svg, setSvg] = useState('')

  useEffect(() => {
    let cancelled = false
    mermaid.render(`mermaid-${id}`, children.trim()).then(({ svg }) => {
      if (!cancelled) setSvg(svg)
    })
    return () => { cancelled = true }
  }, [children, id])

  return (
    <div
      className="huf-mermaid"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
