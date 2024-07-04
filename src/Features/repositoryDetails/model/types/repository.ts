export interface Language {
	name: string;
}

export interface RepositoryOwner {
	login: string;
	avatarUrl: string;
}

export interface Repository {
	id: string;
	name: string;
	stargazers: {
		totalCount: number;
	};
	updatedAt: string;
	owner: RepositoryOwner | undefined;
	languages: {
		edges: { node: Language }[];
	};
	description: string;
	url: string;
}
