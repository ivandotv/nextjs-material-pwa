import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { getPWADisplayMode } from 'lib/client/utils'
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

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom'
      }}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity="info"
      >
        App Display Mode: {displayMode?.toUpperCase()}
      </Alert>
    </Snackbar>
  )
}
