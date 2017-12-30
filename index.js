'use strict'

const express = require('express')
const graphqlHTTP = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID
} = require('graphql')

const utils = require('./src/data')

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
      description: 'Whether or not the video has been watched'
    }
  }
})

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  desscription: 'The root query type',
  fields: {
    videos: {
      type: new GraphQLList(videoType),
      resolve: utils.getVideos
    },
    video: {
      type: videoType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          descrption: 'The ID of the video'
        }
      },
      resolve: (_, args) => {
        return utils.getVideoById(args.id)
      }
    }
  }
})

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root Mutation type',
  fields: {
    createVideo: {
      type: videoType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The title of the video'
        },
        duration: {
          type: new GraphQLNonNull(GraphQLInt),
          descrption: 'The duration of the video(in seconds)'
        },
        realeased: {
          type: new GraphQLNonNull(GraphQLBoolean),
          description: 'Wether or not the video is released'
        }
      },
      resolve: (_, args) => utils.createVideo(args)
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
