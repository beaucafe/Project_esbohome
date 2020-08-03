import React, { ReactNode } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import Menu from './menu'
import Header from './header'
import { CssBaseline } from '@material-ui/core'

interface Props {
  children: ReactNode
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
    },
  })
)

export default function Layout({ children }: Props) {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)

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
        {children}
      </div>
    </React.Fragment>
  )
}
