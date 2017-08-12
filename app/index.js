import express from 'express'
import compression from 'compression'
import Schema from 'graphql-orm-mongoose'

import { SERVER_PORT } from './config'
import GraphQLRouter from './router/GraphQLRouter'

const app = new express()

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    return false
  }

  return compression.filter(req, res)
}

app.use(compression({filter: shouldCompress}))
app.use(express.static('views/js'))
app.use(express.static('views/css'))

app.use('/graphql', GraphQLRouter)

app.use('/graphiql', function (req, res) {
  res.render('index.ejs')
})

app.listen(SERVER_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${SERVER_PORT}`
))
