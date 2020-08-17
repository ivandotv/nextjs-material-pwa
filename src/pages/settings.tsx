import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { defaultApplicationLayout } from '../components/layout/app/DefaultAppShellLayout'

export default function Settings() {
  return (
    <>
      <Paper>
        <Box m={2} p={2}>
          <Typography variant="h6">Settings</Typography>
        </Box>
      </Paper>
      <Paper>
        <Box p={2}>
          <Typography paragraph>
            ABOUT - Consequat mauris nunc congue nisi vitae suscipit. Fringilla
            est ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
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

Settings.layout = defaultApplicationLayout
