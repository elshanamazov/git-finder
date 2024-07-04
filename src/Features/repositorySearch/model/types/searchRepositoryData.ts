import { Repository } from '@/Features/repositoryDetails/model/types/repository';

interface SearchRepositoryNode
	extends Pick<Repository, 'id' | 'name' | 'stargazers' | 'updatedAt' | 'url'> {}

export interface SearchRepositoriesData {
	search: {
		edges: {
			node: SearchRepositoryNode;
		}[];
	};
}
