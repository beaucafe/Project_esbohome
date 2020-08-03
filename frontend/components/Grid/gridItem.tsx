import React, { ReactElement, ReactNode } from 'react'
import { makeStyles, Grid, GridProps } from '@material-ui/core'

interface Props extends GridProps {
  children: ReactNode
}

const styles = {
  grid: {
    padding: '0 15px !important',
  },
}

const useStyles = makeStyles(styles)

export default function GridItem({ children, ...props }: Props): ReactElement {
  const classes = useStyles()
  return (
    <Grid item {...props} className={classes.grid}>
      {children}
    </Grid>
  )
}
