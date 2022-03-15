import { gql } from 'graphql-request';

export const FIND_MOVIES = gql`
  query SearchMovies($query: String!) {
    searchMovies(query: $query) {
      id
      name
      score
      genres {
        name
      }
      releaseDate
    }
  }
`;