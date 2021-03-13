const { ApolloServer, gql } = require('apollo-server');
const MovieSchema = require('./schema/movie');
const SeriesSchema = require('./schema/series');

const typeDefs = gql`
  type Query 

  type Mutation 
`

const resolvers = {
  Query: {
  },
  Mutation: {
  }
}

const server = new ApolloServer({ 
  typeDefs: [typeDefs, MovieSchema.typeDefs, SeriesSchema.typeDefs], 
  resolvers: [resolvers, MovieSchema.resolvers, SeriesSchema.resolvers] 
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
})