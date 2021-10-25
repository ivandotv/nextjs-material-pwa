import { createTheme } from '@mui/material/styles'

// create light theme instance
export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: ' #eaeaea'
    }
  }
})

// create dark theme
export const DarkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true
      }
    }
  }
})
