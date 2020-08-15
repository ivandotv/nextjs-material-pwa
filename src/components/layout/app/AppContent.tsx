import Container from '@material-ui/core/Container'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { ReactNode } from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBarSpacer: {
      ...theme.mixins.toolbar,
      marginBottom: theme.spacing(5)
    },
    content: {
      width: '100%',
      [theme.breakpoints.down('md')]: {
        padding: 0
      }
    }
  })
)

export function AppContent({ children }: { children: ReactNode }) {
  const classes = useStyles()

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="md" disableGutters>
        {/* https://github.com/mui-org/material-ui/issues/21711 */}
        {children as JSX.Element}
      </Container>
    </main>
  )
}
