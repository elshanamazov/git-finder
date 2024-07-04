import { Repository } from '@/Features/repositoryDetails/model/types/repository';
import client from '@/shared/api/apollo';
import { gql } from '@apollo/client';

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

interface SearchRepositoryNode
	extends Pick<Repository, 'id' | 'name' | 'stargazers' | 'updatedAt' | 'url'> {}

interface SearchRepositoriesData {
	search: {
		edges: {
			node: SearchRepositoryNode;
		}[];
	};
}

export const searchRepositories = async (name: string): Promise<Repository[]> => {
	try {
		console.log(`Searching for repositories with name: ${name}`);
		const { data } = await client.query<SearchRepositoriesData>({
			query: SEARCH_QUERY,
			variables: { name },
		});
		console.log('Data received:', data);
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
