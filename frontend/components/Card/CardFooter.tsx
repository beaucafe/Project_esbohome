import React, { ReactElement, ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import cardFooterStyle from 'src/assets/jss/cardFooter.style'
import classNames from 'classnames'

interface Props {
  className?: any
  plain?: boolean
  profile?: boolean
  stats?: boolean
  chart?: boolean
  children: ReactNode
  rest?: any
}

const useStyles = makeStyles(cardFooterStyle)

export default function CardFooter({
  children,
  className,
  plain,
  profile,
  stats,
  chart,
  ...rest
}: Props): ReactElement {
  const classes = useStyles()

  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [classes.cardFooterPlain]: plain,
    [classes.cardFooterProfile]: profile,
    [classes.cardFooterStats]: stats,
    [classes.cardFooterChart]: chart,
    [className]: className !== undefined,
  })
  return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  )
}
