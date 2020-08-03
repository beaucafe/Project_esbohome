import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(helmet())
  const dev = process.env.NODE_ENV !== 'production'

  if (!dev) {
    app.enableCors()
    // console.log(process.env.NODE_ENV)
  } else {
    app.enableCors({ origin: process.env.ORIGIN })
    console.log(process.env.ORIGIN)
  }
  const port = normalizePort(process.env.PORT || '3000')
  await app.listen(port, () => {
    console.log(
      `> Server run mode ${dev ? 'development' : process.env.NODE_ENV}`,
    )
    console.log(`Listening on port http://${process.env.DOMAIN_URI}:${port}`)
  })
}

const corsOptionsDelegate = (req, callback) => {
  let corsOptions
  const whitelist = process.env.ORIGIN
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

function normalizePort(val) {
  let port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}
bootstrap()
