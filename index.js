'use strict'

const express = require('express')
const graphqlHTTP = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID
} = require('graphql')

const getVideoById = require('./src/data')

const PORT = process.env.PORT || 3000

const server = express()

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'A video on Egghead.io',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The ID of the video'
    },
    title: {
      type: GraphQLString,
      description: 'The title of the video'
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the video(in seconds)'
    },
    watched: {
      type: GraphQLBoolean,
      descrption: 'Whether or not the video has been watched'
    }
  }
})

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  desscription: 'The root query type',
  fields: {
    video: {
      type: videoType,
      args: {
        id: {
          type: GraphQLID,
          descrption: 'The ID of the video'
        }
      },
      resolve: (_, args) => {
        return getVideoById(args.id)
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType
})

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
