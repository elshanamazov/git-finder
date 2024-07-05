import { Repository } from '@/features/repositoryDetails/model/types/repository';
import client from '@/shared/api/apollo';
import { gql } from '@apollo/client';
import { SearchRepositoriesData } from '../types/searchRepositoryData';

const SEARCH_QUERY = gql`
	query SearchRepositories($name: String!) {
		search(query: $name, type: REPOSITORY, first: 100) {
			edges {
				node {
					... on Repository {
						id
						name
						stargazers {
							totalCount
						}
						updatedAt
						url
					}
				}
			}
		}
	}
`;

export const searchRepositories = async (name: string): Promise<Repository[]> => {
	try {
		const { data } = await client.query<SearchRepositoriesData>({
			query: SEARCH_QUERY,
			variables: { name },
		});

		return data.search.edges.map((edge) => ({
			id: edge.node.id,
			name: edge.node.name,
			stars: edge.node.stargazers.totalCount,
			lastCommitDate: edge.node.updatedAt,
			url: edge.node.url,
			stargazers: { totalCount: edge.node.stargazers.totalCount },
			updatedAt: edge.node.updatedAt,
			owner: undefined,
			languages: { edges: [] },
			description: '',
		}));
	} catch (error) {
		console.error('Error fetching repositories:', error);
		throw error;
	}
};
