import React, { ReactElement } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import NextNProgress from 'components/nextprogressbar'
import Menu from './menu'
import Header from './header'
import { Container } from '@material-ui/core'
import alphaStyle from './styles/alpha.style'

interface Props {
  children: any
}

const useStyles = makeStyles(alphaStyle)

function Layout({ children }: Props): ReactElement {
  const classes = useStyles()

  const [open, setOpen] = React.useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <NextNProgress
        color="#ff5500"
        options={{ parent: 'header', showSpinner: false }}
      />
      <div className={classes.root}>
        <Header handleDrawerOpen={handleDrawerOpen} open={open} />
        <Menu open={open} handleDrawerClose={handleDrawerClose} />
        <Container maxWidth="xl">
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Layout
