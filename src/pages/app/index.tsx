import { AppLayout } from 'components/layout/AppLayout'
import { ShellTitle } from 'components/ShellTitle'

import { Box, Paper, Typography } from '@mui/material'

export default function AppIndex() {
  return (
    <>
      <ShellTitle title="Home" />
      <Paper>
        <Box m={2} pt={2} pb={2}>
          <Typography variant="h6">Home</Typography>
        </Box>
      </Paper>
      <Paper>
        <Box p={2}>
          <Typography component="p">App version: {__VERSION__}</Typography>
          <>
            <Typography component="p">Commit sha: {__COMMIT_SHA__}</Typography>
            <Typography component="p">Build date: {__BUILD_DATE__}</Typography>
            <Typography component="p">Branch: {__BRANCH__}</Typography>
            <Typography component="p">
              Commit Message: {__COMMIT_MESSAGE__}
            </Typography>
          </>
        </Box>
      </Paper>
    </>
  )
}

AppIndex.layout = AppLayout
