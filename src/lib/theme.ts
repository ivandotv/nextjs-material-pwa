import { createTheme } from '@material-ui/core/styles'

// create light theme instance
export const LightTheme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: ' #eaeaea'
    }
  }
})

// create dark theme
export const DarkTheme = createTheme({
  palette: {
    type: 'dark'
  }
})
