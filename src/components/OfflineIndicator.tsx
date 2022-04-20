import WarningIcon from '@mui/icons-material/Warning'
import Box from '@mui/material/Box'
import { useOfflineNotification } from 'lib/client/hooks'

export function OfflineIndicator({ className = '' }: { className?: string }) {
  const [isOnline] = useOfflineNotification()

  return (
    <Box className={className}>
      {!isOnline ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: (theme) => theme.palette.error.main,
            color: '#fff',
            m: 0,
            fontSize: '1.2rem',
            p: 1,
            position: 'absolute',
            top: '-43px'
          }}
        >
          <WarningIcon />
          <Box
            component="span"
            sx={{
              my: 0,
              mx: 1
            }}
          >
            It appears that you are offline
          </Box>
          <WarningIcon />
        </Box>
      ) : null}
    </Box>
  )
}
