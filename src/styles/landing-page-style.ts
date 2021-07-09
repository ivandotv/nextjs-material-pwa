import { createStyles, makeStyles } from '@material-ui/core/styles'

/* Note - using material version of the jss function */
const styles = makeStyles(() =>
  createStyles({
    '@global': {
      body: {
        fontFamily: 'system-ui, sans-serif',
        margin: 0
      },
      '@media (prefers-color-scheme: dark)': {
        body: {
          backgroundColor: '#212121',
          color: '#fff'
        }
      }
    },
    pageWrap: {
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    },
    bannerWrapper: {
      maxWidth: '300px',
      '& img': {
        width: '100%',
        height: 'auto'
      }
    },
    btn: {
      marginTop: 14,
      padding: 14,
      backgroundColor: 'blue',
      borderRadius: 6,
      color: '#fff',
      fontSize: '1.2rem',
      textDecoration: 'none',
      textAlign: 'center',
      cursor: 'pointer'
    }
  })
)

export default styles
