import {gql} from "graphql-request"

export const GET_MOVIE = gql`
	query getMovie($id: ID!) {
		movie(id: $id) {
			id
			name
			score
			releaseDate
		}
	}
`;