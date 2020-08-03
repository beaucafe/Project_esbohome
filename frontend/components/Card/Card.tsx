import React, { ReactElement, ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
interface Props {
  className?: string
  plain?: boolean
  profile?: boolean
  chart?: boolean
  children?: ReactNode
}

import cardStyles from 'src/assets/jss/card.style'
// import clsx from 'clsx'
import classNames from 'classnames'

const useStyles = makeStyles(cardStyles)

export default function Card({
  className,
  children,
  plain,
  profile,
  chart,
}: Props): ReactElement {
  const classes = useStyles()
  // const { className, children, plain, profile, chart, ...rest } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [classes.cardChart]: chart,
    className: className !== undefined,
  })
  return (
    <React.Fragment>
      <div className={cardClasses}>{children}</div>
    </React.Fragment>
  )
}
