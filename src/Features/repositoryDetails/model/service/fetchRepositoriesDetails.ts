import client from '@/shared/api/apollo';
import { gql } from '@apollo/client';
import { Repository } from '../types/repository';

const REPOSITORY_DETAILS_QUERY = gql`
	query GetRepositoryDetails($owner: String!, $name: String!) {
		repository(owner: $owner, name: $name) {
			name
			stargazers {
				totalCount
			}
			updatedAt
			owner {
				login
				avatarUrl
			}
			languages(first: 10) {
				edges {
					node {
						name
					}
				}
			}
			description
		}
	}
`;

export const fetchRepositoryDetails = async (owner: string, name: string): Promise<Repository> => {
	try {
		const { data } = await client.query({
			query: REPOSITORY_DETAILS_QUERY,
			variables: { owner, name },
		});
		console.log('Received data:', data);
		return data.repository;
	} catch (error) {
		console.error('Error loading repository details:', error);
		throw new Error('Error loading repository details.');
	}
};
