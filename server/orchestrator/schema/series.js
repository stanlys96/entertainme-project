const { gql } = require('apollo-server');
const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

module.exports = {
  typeDefs: gql`
    type Series {
      _id: String
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    }

    type SeriesResult {
      movie: Movie
      error: String
    }

    input AddSeriesInput {
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    }

    input EditSeriesInput {
      id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String] 
    }

    extend type Query {
      series: [Series]
      getSeries(id: ID): Series
    }

    extend type Mutation {
      addSeries(input: AddSeriesInput): Series
      updateSeries(input: EditSeriesInput): Series
      deleteSeries(id: ID): Series
    }
  `,
  resolvers: {
    Query: {
      async series() {
        try {
          const seriesData = await redis.get('series:data');
          if (seriesData) {
            return JSON.parse(seriesData);
          } else {
            const { data } = await axios.get('http://localhost:4002/series');
            redis.set('series:data', JSON.stringify(data));
            return data
          }
        } catch(err) {
          console.log(err);
        }
      },
      async getSeries(_, args) {
        try {
          const { data } = await axios.get(`http://localhost:4002/series/${args.id}`);
          return data
        } catch(err) {
          console.log(err); 
        }
      }
    },
    Mutation: {
      async addSeries(parent, args, context, info) {
        try {
          const { data } = await axios.post('http://localhost:4002/series', args.input);
          await redis.del('series:data');
          return data.ops[0];
        } catch(err) {
          console.log(err);
        }
      },
      async updateSeries(parent, args, context, info) {
        try {
          const { data } = await axios.put(`http://localhost:4002/series/${args.input.id}`, args.input);
          const { data: seriesData } = await axios.get(`http://localhost:4002/series/${args.input.id}`);
          await redis.del('series:data');
          return seriesData;
        } catch(err) {
          console.log(err);
        }
      },
      async deleteSeries(parent, args, context, info) {
        try {
          const { data: seriesData } = await axios.get(`http://localhost:4002/series/${args.id}`);
          const { data } = await axios.delete(`http://localhost:4002/series/${args.id}`);
          await redis.del('series:data');
          return seriesData;
        } catch(err) {
          console.log(err);
        }
      }
    }
  }
}