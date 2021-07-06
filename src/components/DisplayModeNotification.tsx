import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { getPWADisplayMode } from 'lib/utils'
import React, { useEffect, useState } from 'react'

export function DisplayModeNotification() {
  const [open, setOpen] = React.useState(false)
  const [displayMode, setDisplayMode] = useState<string | undefined>()

  useEffect(() => {
    const mode = getPWADisplayMode()
    setTimeout(() => {
      setDisplayMode(mode)
      setOpen(true)
    }, 2500)
  }, [])

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity="info"
      >
        App Display Mode: {displayMode?.toUpperCase()}
      </MuiAlert>
    </Snackbar>
  )
}
