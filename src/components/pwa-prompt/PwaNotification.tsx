import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Slide from '@material-ui/core/Slide'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Close from '@material-ui/icons/Cancel'
import { forwardRef, ReactNode } from 'react'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      position: 'absolute',
      width: '100%',
      top: 0,
      zIndex: 1101,
      backgroundColor: '#2e0d66',
      color: '#fff',
      padding: theme.spacing(1),
      paddingLeft: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      '& p': {
        marginBottom: 0
      }
    },
    closeBtn: {
      color: '#fff'
      //   paddingLeft: 0
    },
    icon: {
      fontSize: 40
    },
    title: {
      fontWeight: 'bold',
      margin: 0,
      fontSize: '1.0rem'
    }
  })
)

const PwaNotification = forwardRef<
  HTMLDivElement,
  {
    // className: string
    onCancel: () => void
    onOk: () => void
    okText: string
    title: string
    show: boolean
    children: ReactNode
  }
>(function PwaNotification(
  { show, okText, children, onCancel, onOk, title },
  ref
) {
  const classes = useStyles()

  return (
    <Slide direction="down" in={show} mountOnEnter unmountOnExit>
      <div ref={ref} className={classes.wrapper}>
        <div>
          <IconButton
            aria-label="close"
            className={classes.closeBtn}
            onClick={onCancel}
          >
            <Close className={classes.icon} />
          </IconButton>
        </div>
        <div className={classes.text}>
          {title ? <h6 className={classes.title}>{title}</h6> : null}
          {children}
        </div>
        <div>
          <Button
            onClick={onOk}
            variant="contained"
            color="primary"
            disableElevation
          >
            {okText}
          </Button>
        </div>
      </div>
    </Slide>
  )
})

export default PwaNotification
