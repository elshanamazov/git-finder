import { RepositoryDetails } from '@/Features/repositoryDetails';
import cls from './GitRepoPage.module.scss';

export const GitRepoPage = () => {
	return (
		<div className={cls.GitRepoPage}>
			<RepositoryDetails />
		</div>
	);
};
