const { gql } = require('apollo-server');
const axios = require('axios');

module.exports = {
  typeDefs: gql`
    type Movie {
      _id: String
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    }

    type MovieResult {
      movie: Movie
      error: String
    }

    input AddMovieInput {
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    }

    input EditMovieInput {
      id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String] 
    }

    extend type Query {
      movies: [Movie]
      getMovie(id: ID): Movie
    }

    extend type Mutation {
      addMovie(input: AddMovieInput): Movie
      updateMovie(input: EditMovieInput): Movie
      deleteMovie(id: ID): Movie
    }
  `,
  resolvers: {
    Query: {
      async movies() {
        try {
          const { data } = await axios.get('http://localhost:4001/movies');
          return data
        } catch(err) {
          console.log(err);
        }
      },
      async getMovie(_, args) {
        try {
          const { data } = await axios.get(`http://localhost:4001/movies/${args.id}`);
          return data
        } catch(err) {
          console.log(err); 
        }
      }
    },
    Mutation: {
      async addMovie(parent, args, context, info) {
        try {
          const { data } = await axios.post('http://localhost:4001/movies', args.input);
          return data.ops[0];
        } catch(err) {
          console.log(err);
        }
      },
      async updateMovie(parent, args, context, info) {
        try {
          const { data } = await axios.put(`http://localhost:4001/movies/${args.input.id}`, args.input);
          const { data: movieData } = await axios.get(`http://localhost:4001/movies/${args.input.id}`);
          return movieData;
        } catch(err) {
          console.log(err);
        }
      },
      async deleteMovie(parent, args, context, info) {
        try {
          const { data: movieData } = await axios.get(`http://localhost:4001/movies/${args.id}`);
          const { data } = await axios.delete(`http://localhost:4001/movies/${args.id}`);
          return movieData;
        } catch(err) {
          console.log(err);
        }
      }
    }
  }
}