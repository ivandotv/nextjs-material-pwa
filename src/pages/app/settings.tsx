import AccountBoxIcon from '@mui/icons-material/AccountBox'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemIcon from '@mui/material/ListItemIcon'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { SettingsProfile, ShellTitle } from 'components'
import { AppLayout } from 'components/layout'
import { MobileMenuItem } from 'components/sidebars'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

export default function Settings() {
  const router = useRouter()

  return (
    <>
      <Paper>
        <Box m={2} pt={2} pb={2}>
          <Typography variant="h6">Settings</Typography>
        </Box>
      </Paper>
      {router.query.section === 'profile' ? (
        <SettingsProfile />
      ) : (
        <MainContent />
      )}
    </>
  )
}

function MainContent() {
  return (
    <>
      <ShellTitle title="Settings" />
      <Paper>
        <Box p={2}>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
            suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
            ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
            aliquam sem et tortor. Habitant morbi tristique senectus et.
            Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
            euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuerj sollicitudin aliquam
            ultrices sagittis orci a. s sense)
          </Typography>
        </Box>
      </Paper>
    </>
  )
}

Settings.layout = AppLayout

Settings.desktopSidebar = function SettingsMenuDesktop(
  defaultItems: ReactNode
) {
  return (
    <>
      <List>{defaultItems}</List>
      <Divider />
      <List>
        <MobileMenuItem
          icon={
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
          }
          link={{ href: '/app/settings?section=profile', shallow: true }}
        >
          Profile
        </MobileMenuItem>
      </List>
    </>
  )
}

Settings.mobileSidebar = function SettingsMenuMobile(defaultItems: ReactNode) {
  return (
    <>
      <List>{defaultItems}</List>
      <Divider />
      <List>
        <MobileMenuItem
          icon={
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
          }
          link={{ href: '/app/settings?section=profile', shallow: true }}
        >
          Profile
        </MobileMenuItem>
      </List>
    </>
  )
}
