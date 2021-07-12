import Head from 'next/head'

export default function PageTitle({ title }: { title?: string }) {
  return title ? (
    <Head>
      <title key="title">{title}</title>
    </Head>
  ) : null
}
