import { fetchRepositoryDetails } from '@/Features/repositoryDetails/model/service/fetchRepositoriesDetails';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Repository } from '../model/types/repository';
import cls from './RepositoryDetails.module.scss';

export const RepositoryDetails = () => {
	const { owner, name } = useParams<{ owner: string; name: string }>();
	const [repository, setRepository] = useState<Repository | null>(null);
	const [status, setStatus] = useState<'loading' | 'error' | 'loaded'>('loading');
	const [errorMessage, setErrorMessage] = useState<string>('');

	useEffect(() => {
		const fetchDetails = async () => {
			if (!owner || !name) {
				setErrorMessage('Invalid repository owner or name');
				setStatus('error');
				return;
			}

			try {
				const data = await fetchRepositoryDetails(owner, name);
				setRepository(data);
				setStatus('loaded');
			} catch (error) {
				console.error(error);
				setErrorMessage('Failed to fetch repository details');
				setStatus('error');
			}
		};

		fetchDetails();
	}, [owner, name]);

	if (status === 'loading') return <p>Loading...</p>;
	if (status === 'error') return <p>{errorMessage}</p>;
	if (!repository) return <p>No repository data available.</p>;

	return (
		<div className={cls.RepositoryDetails}>
			<div className={cls.repoCard}>
				<h2 className={cls.repoTitle}>
					{repository.name} - {repository.stargazers.totalCount} stars - Last commit:{' '}
					{new Date(repository.updatedAt).toLocaleDateString()}
				</h2>
				<div>
					<img
						src={repository.owner?.avatarUrl || 'default-avatar.png'}
						alt={`${repository.owner?.login || 'Unknown'}'s avatar`}
						className={cls.repoOwnerImg}
					/>
					<a
						href={repository.owner ? `https://github.com/${repository.owner.login}` : '#'}
						className={cls.repoLink}>
						{repository.owner?.login || 'Unknown owner'}
					</a>
				</div>
				<p className={cls.repoDesc}>{repository.description || 'No description available.'}</p>
				<div>
					<strong>Languages:</strong>
					<ul className={cls.repoLanguages}>
						{repository.languages.edges.map(({ node }) => (
							<li key={node.name} className={cls.languageItem}>
								{node.name}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
