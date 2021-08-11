/* eslint-disable */

import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import App from './App'

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './assets/theme/theme';

ReactDOM.render((
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </ThemeProvider>
), document.getElementById('root'));

serviceWorker.unregister();
