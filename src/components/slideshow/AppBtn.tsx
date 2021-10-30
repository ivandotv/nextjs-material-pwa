import Link from 'next/link'
export function AppBtn({ text }: { text: string }) {
  return (
    <Link href="/app">
      <a
        css={{
          marginBottom: 24,
          cursor: 'pointer',
          border: '2px solid #fff',
          padding: 8,
          color: '#fff',
          textDecoration: 'none',
          userSelect: 'none'
        }}
      >
        {text}
      </a>
    </Link>
  )
}
