import React, { ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import typographyStyle from 'src/assets/jss/typoGraphy.style'

interface Props {
  children: ReactNode
}
const useStyles = makeStyles(typographyStyle)
export default function Danger({ children }: Props) {
  const classes = useStyles()
  return (
    <div className={classes.defaultFontStyle + ' ' + classes.dangerText}>
      {children}
    </div>
  )
}
