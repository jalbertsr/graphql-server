'use strict'

const { graphql, buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    foo: String
  }

  type Schema {
    query: Query
  }
`)

const resolvers = {
  foo: () => 'bar'
}

const query = `
  query myFirstQuery {
    foo
  }
`

graphql(schema, query, resolvers)
  .then(results => console.log(results))
  .catch(results => console.log(results))
