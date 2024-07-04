import { fetchRepositoryDetails } from '@/Features/repositoryDetails/model/service/fetchRepositoriesDetails';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Repository } from '../model/types/repository';
import cls from './RepositoryDetails.module.scss';

export const RepositoryDetails = () => {
	const { owner, name } = useParams<{ owner: string; name: string }>();
	const [repository, setRepository] = useState<Repository | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchRepository = async () => {
			if (!owner || !name) {
				setError('Invalid repository owner or name');
				setLoading(false);
				return;
			}

			try {
				console.log(`Fetching details for owner: ${owner}, name: ${name}`);
				const data = await fetchRepositoryDetails(owner, name);
				setRepository(data);
				setLoading(false);
			} catch (err) {
				console.error('Failed to fetch repository details:', err);
				setError('Failed to fetch repository details');
				setLoading(false);
			}
		};

		fetchRepository();
	}, [owner, name]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;
	if (!repository) return <p>No repository data available.</p>;

	return (
		<div className={cls.RepositoryDetails}>
			<div className={cls.repoCard}>
				<h1 className={cls.repoTitle}>
					{repository.name} - {repository.stargazers.totalCount} stars - Last commit:{' '}
					{new Date(repository.updatedAt).toLocaleDateString()}
				</h1>
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
