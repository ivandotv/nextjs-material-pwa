import { createMuiTheme } from '@material-ui/core/styles'

// create light theme instance
export const LightTheme = createMuiTheme({
  palette: {
    type: 'light',
    background: {
      default: ' #eaeaea'
    }
  }
})

// create dark theme
export const DarkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})
