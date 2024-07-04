import { create } from 'zustand';

interface SearchState {
	searchQuery: string;
	currentPage: number;
	setSearchQuery: (query: string) => void;
	setCurrentPage: (page: number) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
	searchQuery: '',
	currentPage: 1,
	setSearchQuery: (query) => set({ searchQuery: query }),
	setCurrentPage: (page) => set({ currentPage: page }),
}));
