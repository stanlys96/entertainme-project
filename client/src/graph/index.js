import { gql } from '@apollo/client';

export const GET_DATA = gql`
  query GetData {
    movies {
      _id 
      title
      overview
      poster_path
      popularity
      tags
    }
    series {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const ADD_MOVIE = gql`
mutation addMovie($input: AddMovieInput) {
  addMovie(movie: $input) {
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

export const UPDATE_MOVIE = gql`
  mutation editMovie($input: EditMovieInput) {
    updateMovie(movie: $input) {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const DELETE_MOVIE = gql`
  mutation deleteMovie($id: ID) {
    deleteMovie(id: $id) {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;