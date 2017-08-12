import mongoose from 'mongoose'
import path from 'path'
import Schema from 'graphql-orm-mongoose'

import { mongoConfig } from "../config"

const mongoUrl = mongoConfig.url

mongoose.connect(mongoUrl, {
  server: {
    socketOptions: {keepAlive: 120, connectTimeoutMS: 30000},
    poolSize: mongoConfig.poolSize
  },
  replset: {
    socketOptions: {keepAlive: 120, connectTimeoutMS: 300000},
    poolSize: mongoConfig.poolSize
  }
})

const fs = require('fs')

function flatten(list) {
  if (Array.isArray(list)) {
    return list.reduce((acc, current) => acc.concat(flatten(current)), [])
  } else {
    return list
  }
}

function requireFromDir(dir) {
  const list = fs.readdirSync(path.resolve(__dirname, dir)).map(function (file) {

    const stats = fs.statSync(path.resolve(__dirname, dir, file))
    const relativePath = [dir, file].join('/')
    if (stats.isDirectory()) {
      return requireFromDir(relativePath)
    } else if (stats.isFile()) {
      if (file.match(/\.js$/) !== null && file !== 'index.js') {
        var name = './' + relativePath.replace('.js', '');
        //return require('./models/' + name).default

        return require(name).default
      }
    }
  });
  return list.filter(x => x !== undefined)
}

const models = flatten(requireFromDir('models'))

const types = flatten(requireFromDir('types'))

export const {graphql : GraphQlSchema, models: MongooseModels} = Schema.buildAll({
  types,
  models,
  hooks: []
})

export default GraphQlSchema
