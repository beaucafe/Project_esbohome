import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    grey: {
      800: '#424242',
    },

    error: {
      main: red.A400,
    },
    background: {
      default: 'WhiteSmoke',
    },
  },
})

export default theme
