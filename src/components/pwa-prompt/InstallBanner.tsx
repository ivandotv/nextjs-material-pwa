import { PWANotification } from './PwaNotification'
import Box from '@mui/material/Box'

export function InstallBanner({
  onCancel,
  onOk,
  show
}: {
  onCancel: () => void
  onOk: () => void
  show: boolean
}) {
  return (
    <Box sx={{ backgroundColor: 'red' }}>
      <PWANotification
        onCancel={onCancel}
        onOk={onOk}
        show={show}
        title="Install"
        okText="Install"
      >
        <p>
          Installing Material App uses almost no storage and provides a quick
          way to launch it from the home screen.
        </p>
      </PWANotification>
    </Box>
  )
}
