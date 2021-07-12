import { Actions, useAppShell } from 'components/providers/AppShellProvider'
import PageTitle from 'components/PageTitle'
import { useEffect } from 'react'

export function ShellTitle({ title }: { title: string }) {
  const { dispatch } = useAppShell()

  useEffect(() => {
    dispatch({
      type: Actions.SET_TITLE,
      payload: title
    })
  }, [dispatch, title])

  return <PageTitle title={title} />
}
