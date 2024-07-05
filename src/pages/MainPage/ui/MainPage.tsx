import { RepositorySearch } from '@/features/repositorySearch';
import { RepoList } from '@/widgets/RepoList/ui/RepoList';
import cls from './MainPage.module.scss';

export const MainPage = () => {
	return (
		<div className={cls.MainPage}>
			<RepositorySearch />
			<RepoList />
		</div>
	);
};
