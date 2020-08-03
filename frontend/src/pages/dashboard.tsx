import React from 'react'
import Layout from 'components/layouts/alpha/layout'
import { makeStyles } from '@material-ui/core/styles'
import alphaStyle from 'components/layouts/alpha/styles/alpha.style'
import {
  FileCopyTwoTone,
  DateRange,
  Store,
  LocalOffer,
  InfoOutlined,
  Accessibility,
  Update,
} from '@material-ui/icons'

import Warning from '@material-ui/icons/Warning'
import GridContainer from 'components/Grid/gridContainer'
import GridItem from 'components/Grid/gridItem'
import Card from 'components/Card/Card'
import CardHeader from 'components/Card/CardHeader'
import CardIcon from 'components/Card/CardIcon'
import CardFooter from 'components/Card/CardFooter'
import Danger from 'components/Typography/Danger'

interface Props {}

const useStyles = makeStyles(alphaStyle)

export default function Dashboard({}: Props) {
  const classes = useStyles()
  // React.useEffect(() => {
  //   document.body.className = 'wapper'
  //   document.title = 'Admin page'
  // })

  return (
    <Layout>
      {/* <main className={classes.content}>
        <div className={classes.toolbar} /> */}
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <FileCopyTwoTone />
              </CardIcon>
              <p className={classes.cardCategory}>ยอดสั่งซื้อ</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>ยอดขาย</p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <InfoOutlined />
              </CardIcon>
              <p className={classes.cardCategory}>ยอดรับคืน</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>จำนวนบิล</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      {/* </main> */}
    </Layout>
  )
}
