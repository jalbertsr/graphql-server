'use strict'

const {
  nodeDefinitions,
  fromGlobalId
} = require('graphql-relay')
const { getObjectById } = require('./data')

const { nodeInterface, nodeField } = nodeDefinitions(
  gloablId => {
    const { type, id } = fromGlobalId(gloablId)
    return getObjectById(type.toLowerCase(), id)
  },
  object => {
    const { videoType } = require('../index')
    return object.title ? videoType : null
  }
)

exports.nodeInterface = nodeInterface
exports.nodeField = nodeField
