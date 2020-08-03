import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../theme'
import { AppProps } from 'next/app'
import Router from 'next/router'
import Head from 'next/head'
// import NextNProgress from 'components/nextprogressbar'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

// NProgress.configure({
//   showSpinner: false,
//   trickleRate: 0.3,
//   trickleSpeed: 200,
//   parent: 'body',
// })

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  // NProgress.start()
})

Router.events.on('routeChangeComplete', () => {
  console.log('on complete')
  // NProgress.done()
})

Router.events.on('routeChangeError', () => {
  console.log('on error')

  // NProgress.done()
})

export default function MyApp(appProps: AppProps) {
  const { Component, pageProps } = appProps

  // React.useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector('#jss-server-side')
  //   if (jssStyles) {
  //     jssStyles.parentElement?.removeChild(jssStyles)
  //   }
  // }, [])
  // const color = '#ff5500'
  // const height = 3
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Head>
          <meta name="viewport" content="viewport-fit=cover" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
