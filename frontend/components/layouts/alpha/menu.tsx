import React, { ReactElement } from 'react'
import {
  Drawer,
  IconButton,
  makeStyles,
  List,
  Divider,
  useTheme,
  Collapse,
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import classNames from 'clsx'
// import classNames from 'classnames'
import alphaStyle from './styles/alpha.style'
import Router from 'next/router'
import { ExpandLess, StarBorder, ExpandMore } from '@material-ui/icons'

interface Props {
  open: boolean
  handleDrawerClose: any
}

const useStyles = makeStyles(alphaStyle)
const logoImage = '/static/images/Logo-Esbo.svg'

export default function Menu({ open, handleDrawerClose }: Props): ReactElement {
  const classes = useStyles()
  const theme = useTheme()
  const [openList, setOpenList] = React.useState(false)
  const handleClick = () => {
    setOpenList(!openList)
  }

  return (
    <React.Fragment>
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.logo}>
          <img className={classes.logo} src={logoImage}></img>
        </div>
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Dashboard', 'Alpha', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem
              button
              key={text}
              onClick={() => Router.push(`/${text.toLowerCase()}`)}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="From" />
          {openList ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openList} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={() => Router.push(`/froms/setting`)}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Setting" />
            </ListItem>
          </List>
        </Collapse>
      </Drawer>
    </React.Fragment>
  )
}
