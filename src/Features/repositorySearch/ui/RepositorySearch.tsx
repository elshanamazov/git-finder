/* eslint-disable react-hooks/exhaustive-deps */
// import { useRepositoryStore } from '@/features/repositoryDetails/model/store/useRepositoryStore';
import { useRepositoryStore } from '@/features/repositoryDetails';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchRepositories } from '../model/service/searchRepositories';
import cls from './RepositorySearch.module.scss';

export const RepositorySearch = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const repoName = searchParams.get('search') || '';
	const { setRepositories } = useRepositoryStore();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>('');

	const debouncedFetchRepositories = useCallback(
		debounce(async (name: string) => {
			if (!name.trim()) return;
			setLoading(true);
			setError('');
			try {
				const data = await searchRepositories(name);
				setRepositories(data);
				setLoading(false);
			} catch (error: unknown) {
				if (error instanceof Error) {
					setError('Failed to fetch repositories: ' + error.message);
				} else {
					setError('Failed to fetch repositories: An unknown error occurred');
				}
			} finally {
				setLoading(false);
			}
		}, 300),
		[],
	);

	useEffect(() => {
		if (repoName) {
			debouncedFetchRepositories(repoName);
		}
	}, [repoName, debouncedFetchRepositories]);

	const handleInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
		setSearchParams({ search: value });
	};

	return (
		<div className={cls.RepositorySearch}>
			<label>
				Repositories Name:
				<input
					className={cls.input}
					type="text"
					placeholder="Type here"
					value={repoName}
					onChange={handleInputChange}
				/>
			</label>
			<div>
				{loading && <p>Loading...</p>}
				{error && <p>{error}</p>}
			</div>
		</div>
	);
};
