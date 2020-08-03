import React, { ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import clsx from 'clsx'
import cardIconStyle from 'src/assets/jss/cardIcon.style'
import classNames from 'classnames'

type colors = 'warning' | 'success' | 'danger' | 'info' | 'primary' | 'rose'

interface Props {
  className?: any
  color?: colors
  children: ReactNode
  rest?: any
}

const useStyles = makeStyles(cardIconStyle)

export default function CardIcon({
  children,
  className,
  color,
  ...rest
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

  const cardIconClasses = classNames({
    [classes.cardIcon]: true,
    [scolor]: color,
    [className]: className !== undefined,
  })
  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  )
}
