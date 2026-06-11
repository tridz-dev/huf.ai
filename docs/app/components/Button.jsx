import Link from 'next/link'

export function Button({ href, variant = 'solid', children, ...rest }) {
  const className = `huf-btn ${variant === 'solid' ? 'huf-btn-solid' : 'huf-btn-ghost'}`

  if (href && (href.startsWith('http') || href.startsWith('mailto:'))) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href || '#'} className={className} {...rest}>
      {children}
    </Link>
  )
}
