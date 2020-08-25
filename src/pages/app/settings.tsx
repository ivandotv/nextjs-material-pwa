import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { AppDefaultLayout } from '../../components/app/layout/AppDefaultLayout'
import { SettingsProfile } from '../../components/app/SettingsProfile'
import { MobileMenuItem } from '../../components/app/sidebars/MobileMenuItem'

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
    <Paper>
      <Box p={2}>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuerj sollicitudin aliquam ultrices sagittis orci a. s sense)
        </Typography>
      </Box>
    </Paper>
  )
}

Settings.layout = AppDefaultLayout
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
