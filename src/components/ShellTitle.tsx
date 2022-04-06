import { Actions, useAppShell } from 'components/providers/AppShellProvider'
import { useEffect } from 'react'
import Head from 'next/head'

export function ShellTitle({ title }: { title: string }) {
  const { dispatch } = useAppShell()

  useEffect(() => {
    dispatch({
      type: Actions.SET_TITLE,
      payload: title
    })
  }, [dispatch, title])

  return title ? (
    <Head>
      <title key="title">{title}</title>
    </Head>
  ) : null
}
