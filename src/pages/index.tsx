import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { AppMenuItem } from '../components/layout/app/AppMenuItem'
import { AppShellLayout } from '../components/layout/app/AppShellLayout'
import { AppShellProvider } from '../components/layout/app/AppShellProvider'
import { MobileMenuItem } from '../components/layout/app/MobileMenuItem'
import { NextApplicationPage } from './_app'

const Index: NextApplicationPage = function () {
  return (
    <>
      <Paper>
        <Box m={2} p={2}>
          <Typography variant="h6">Index</Typography>
        </Box>
      </Paper>
      <Paper>
        <Box p={2}>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
        </Box>
      </Paper>
    </>
  )
}

Index.desktopSidebar = function IndexDesktopSidebar(defaultItems) {
  return (
    <List>
      {defaultItems}
      <AppMenuItem href="/">Custom item -home</AppMenuItem>
      <AppMenuItem href="/about">Custom item -about</AppMenuItem>
    </List>
  )
}

Index.mobileSidebar = function IndexMobileSidebar(defaultItems) {
  return (
    <List>
      {defaultItems}
      <MobileMenuItem href="/">Mobile index</MobileMenuItem>
      <MobileMenuItem href="/about">Mobile About</MobileMenuItem>
    </List>
  )
}

// eslint-disable-next-line react/display-name
Index.layout = (Component: NextApplicationPage, props: any) => {
  // const sidebar = Component.getSidebar()

  // const Component
  return (
    <AppShellProvider>
      <AppShellLayout
        desktopSidebar={Index.desktopSidebar}
        mobileSidebar={Index.mobileSidebar}
      >
        <Component {...props} />
      </AppShellLayout>
    </AppShellProvider>
  )
}

export default Index
