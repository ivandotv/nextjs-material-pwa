import Close from '@mui/icons-material/Cancel'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Slide from '@mui/material/Slide'
import Typography from '@mui/material/Typography'
import { forwardRef, ReactNode } from 'react'

const PWANotification = forwardRef<
  HTMLDivElement,
  {
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
  return (
    <Slide direction="down" in={show} mountOnEnter unmountOnExit>
      <Box
        ref={ref}
        sx={{
          position: 'absolute',
          width: '100%',
          top: 0,
          zIndex: 1101,
          backgroundColor: '#2e0d66',
          color: '#fff',
          p: 1,
          pl: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box>
          <IconButton
            aria-label="close"
            sx={{ color: '#fff' }}
            onClick={onCancel}
            size="large"
          >
            <Close sx={{ fontSize: 40 }} />
          </IconButton>
        </Box>
        <Box>
          {title ? (
            <Typography
              component="h6"
              sx={{
                fontWeight: 'bold',
                margin: 0,
                fontSize: '1.0rem'
              }}
            >
              {title}
            </Typography>
          ) : null}
          {children}
        </Box>
        <Box>
          <Button
            sx={{ ml: 1 }}
            onClick={onOk}
            variant="contained"
            color="primary"
            disableElevation
          >
            {okText}
          </Button>
        </Box>
      </Box>
    </Slide>
  )
})

export { PWANotification }
