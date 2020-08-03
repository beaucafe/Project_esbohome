import React, { ReactElement } from 'react'
import { makeStyles, TextField } from '@material-ui/core'
// import loginStyle from '../styles/login.style'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Router from 'next/router'
import NextNProgress from 'components/nextprogressbar'

interface Props {}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 155,
  },
  content: {
    paddingTop: 40,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))
const onClickLogin = () => {
  Router.push('/alpha')
}

export default function login({}: Props): ReactElement {
  const classes = useStyles()
  return (
    <React.Fragment>
      <NextNProgress color="#ff5500" options={{ showSpinner: false }} />
      <div className={classes.container}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image="/static/images/esboLogin.png"
            title="Contemplative Reptile"
          />
          <CardContent className={classes.content}>
            <form noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                autoComplete="email"
                size="small"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                size="small"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onClickLogin}
              >
                Sign In
              </Button>
              <Button fullWidth size="small" color="primary">
                Register
              </Button>
            </form>
          </CardContent>
        </Card>

        <style jsx global>
          {`
            body {
              min-height: 100vh;
              position: relative;
              margin: 0;
              background-size: cover;
              background-image: url('/static/images/bg4.jpg');
              text-align: center;
            }
          `}
        </style>
      </div>
    </React.Fragment>
  )
}
