/* eslint-disable */

import React, {Suspense, lazy} from 'react'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { useRoutes } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import GlobalStyles from './components/GlobalStyles'
import theme from './theme'
import Loader from './components/loader/loader'
import routes from './Routes'

const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Suspense fallback={<Loader />}>
        {routing}
      </Suspense>
    </ThemeProvider>
  );
}

export default App
