import React, { ReactElement } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import Menu from './menu'
import Header from './header'
import { CssBaseline, Container } from '@material-ui/core'

interface Props {
  children: any
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
    },
  })
)

export default function Layout({ children }: Props): ReactElement {
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
      <div className={classes.root}>
        <CssBaseline />
        <Header handleDrawerOpen={handleDrawerOpen} open={open} />
        <Menu open={open} handleDrawerClose={handleDrawerClose} />
        <Container>{children}</Container>
      </div>
    </React.Fragment>
  )
}
