import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import WarningIcon from '@material-ui/icons/Warning'
import { useOfflineNotification } from 'lib/useOfflineNotification'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    indicator: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.palette.error.main,
      color: '#fff',
      margin: 0,
      fontSize: '1.2rem',
      padding: `${theme.spacing(1)}px`,
      position: 'absolute',
      top: '-43px'
    },
    text: {
      margin: `0 ${theme.spacing(1)}px`
    }
  })
)

export function OfflineIndicator({ className }: { className: string }) {
  const [isOnline] = useOfflineNotification()
  const classes = useStyles()

  return (
    <div className={className}>
      {!isOnline ? (
        <p className={classes.indicator}>
          <WarningIcon />
          <span className={classes.text}>It appears that you are offline</span>
          <WarningIcon />
        </p>
      ) : null}
    </div>
  )
}
