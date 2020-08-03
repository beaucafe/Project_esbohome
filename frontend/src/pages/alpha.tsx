import React, { ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Layout from 'components/layouts/alpha/layout'
import alphaStyle from 'components/layouts/alpha/styles/alpha.style'
import GridContainer from 'components/Grid/gridContainer'
import GridItem from 'components/Grid/gridItem'
import {
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core'

interface Props {
  children: ReactNode
}

const bull = (
  <span
    style={{
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    }}
  >
    •
  </span>
)
const useStyles = makeStyles(alphaStyle)

export default function stock({}: Props) {
  const classes = useStyles()
  return (
    <Layout>
      {/* <main className={classes.content}>
        <div className={classes.toolbar} /> */}
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
              <Typography variant="h5" component="h2">
                be{bull}nev{bull}o{bull}lent
              </Typography>
              <Typography style={{ marginBottom: 12 }} color="textSecondary">
                adjective
              </Typography>
              <Typography variant="body2" component="p">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </GridItem>
      </GridContainer>
      {/* </main> */}
    </Layout>
  )
}
