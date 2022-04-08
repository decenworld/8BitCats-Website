//Your theme for the new stuff using material UI has been copied here so it doesn't conflict
import { createMuiTheme } from '@material-ui/core/styles';

const newTheme = createMuiTheme({
  palette: {
    type: 'dark',
    text: {
      primary: '#dddfee',
      secondary: 'white',
      yellow: '#d19aff',
    },
    background: {
      default: '#222f3e',
      paper: '#ffffff47',
    },
    primary: {
      light: '#ffe066',
      main: '#2c2560',
      dark: '#b38f00',
      contrastText: '#000',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    action: {
      disabledBackground: '#CDCDCD',
      active: '#000',
      hover: '#000',
    },
  },
  typography: {
    color: '#2c2560',
    fontFamily: ['"monospace"', 'sans-serif'].join(','),
  },
});

export default newTheme;
