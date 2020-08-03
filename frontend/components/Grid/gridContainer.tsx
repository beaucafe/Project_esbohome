import React, { ReactNode } from 'react'
import { makeStyles, Grid, GridProps } from '@material-ui/core'

interface Props extends GridProps {
  children: ReactNode
}

const styles = {
  grid: {
    margin: '0 -15px !important',
    width: 'unset',
  },
}

const useStyles = makeStyles(styles)

export default function GridContainer({ children, ...props }: Props) {
  const classes = useStyles()
  return (
    <Grid container {...props} className={classes.grid}>
      {children}
    </Grid>
  )
}
