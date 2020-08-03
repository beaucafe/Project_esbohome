import React, { ReactNode } from 'react'
import { makeStyles } from '@material-ui/core'
import classNames from 'classnames'
import cardHeaderStyle from 'src/assets/jss/cardHeader.style'

type colors = 'warning' | 'success' | 'danger' | 'info' | 'primary' | 'rose'
interface Props {
  className?: any
  color?: colors
  plain?: boolean
  stats?: boolean
  icon?: boolean
  children?: ReactNode
  rest?: any
}

const useStyles = makeStyles(cardHeaderStyle)

export default function CardHeader({
  children,
  className,
  color,
  plain,
  stats,
  icon,
}: Props) {
  const classes = useStyles()
  let scolor = ''
  switch (color) {
    case 'warning':
      scolor = classes['warningCardHeader']
      break
    case 'success':
      scolor = classes['successCardHeader']
      break
    case 'danger':
      scolor = classes['dangerCardHeader']
      break
    case 'info':
      scolor = classes['infoCardHeader']
      break
    case 'primary':
      scolor = classes['primaryCardHeader']
      break
    case 'rose':
      scolor = classes['roseCardHeader']
      break
  }
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [scolor]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [className]: className !== undefined,
  })
  return <div className={cardHeaderClasses}>{children}</div>
}
