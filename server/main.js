import bodyParser from 'body-parser'
import Express from 'express'
import routes from './routes'

const app = Express()

app.use(bodyParser.json())
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-type,Accept,x-access-token,X-Key'
  })
  req.method === 'OPTIONS' ? res.status(200).end() : next()
})

routes(app)

export default app