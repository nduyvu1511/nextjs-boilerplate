import { buildSchema } from 'graphql'

export {}

const schema = buildSchema(`
    type Query {
        name(firstname: String!, lastname: String!): String
    }
`)
