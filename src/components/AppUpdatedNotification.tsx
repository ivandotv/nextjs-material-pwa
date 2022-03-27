import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Cookies from 'js-cookie'
import React, { useEffect } from 'react'

export function AppUpdatedNotification({ cookieName }: { cookieName: string }) {
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    if (Cookies.get(cookieName)) {
      Cookies.remove(cookieName)
      setOpen(true)
    }
  }, [cookieName])

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
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity="success"
      >
        Application Updated!
      </Alert>
    </Snackbar>
  )
}
