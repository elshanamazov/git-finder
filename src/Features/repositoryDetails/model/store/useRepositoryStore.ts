import { create } from 'zustand';

interface Repository {
	stargazers: string;
	updatedAt: string;
	url: string | undefined;
	id: string;
	name: string;
	stars: number;
	lastCommitDate: string;
}

interface RepositoryState {
	repositories: Repository[];
	setRepositories: (repositories: Repository[]) => void;
}

export const useRepositoryStore = create<RepositoryState>((set) => ({
	repositories: [],
	setRepositories: (repositories) => set({ repositories }),
}));
