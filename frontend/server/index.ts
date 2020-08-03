import express, { Request, Response } from 'express'
import next from 'next'
import bodyParser from 'body-parser'

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()
    //   server.use(compression());
    server.use(bodyParser.json())

    server.get('*', (req: Request, res: Response) => {
      return handle(req, res)
    })
    const port = parseInt(process.env.PORT || '3000', 10)
    server.listen(port, (err?: any) => {
      if (err) throw err
      // tslint:disable-next-line:no-console
      console.log(
        `> Server run mode ${dev ? 'development' : process.env.NODE_ENV}`
      )
      console.log(`> Server listening at http://localhost:${port}`)
    })
  })
  .catch((e) => {
    console.error(e.message)
    process.exit(1)
  })

// app.prepare().then(() => {
//   createServer((req, res) => {
//     const parsedUrl = parse(req.url!, true)
//     const { pathname, query } = parsedUrl

//     if (pathname === '/a') {
//       app.render(req, res, '/a', query)
//     } else if (pathname === '/b') {
//       app.render(req, res, '/b', query)
//     } else {
//       handle(req, res, parsedUrl)
//     }
//   }).listen(port)

//   // tslint:disable-next-line:no-console
//   console.log(
//     `> Server listening at http://localhost:${port} as ${
//       dev ? 'development' : process.env.NODE_ENV
//     }`
//   )
// })
