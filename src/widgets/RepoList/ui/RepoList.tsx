import { useRepositoryStore } from '@/Features/repositoryDetails/model/store/useRepositoryStore';
import { useSearchStore } from '@/Features/repositorySearch/model/store/useSearchStore';
import { Card } from '@/widgets/Card/ui/Card';
import { Pagination } from '@/widgets/Pagination';
import { useMemo } from 'react';
import cls from './RepoList.module.scss';

const PageSize = 10;

export const RepoList = () => {
	const { repositories } = useRepositoryStore();
	const { currentPage, setCurrentPage } = useSearchStore();

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return repositories.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, repositories]);

	return (
		<>
			<div className={cls.parent_cards}>
				{currentTableData.map((repo) => (
					<Card
						key={repo.id}
						name={repo.name}
						stargazers_count={repo.stars}
						pushed_at={repo.updatedAt}
						html_url={repo.url}
						id={repo.id}
					/>
				))}
			</div>
			<div className={cls.pagination}>
				<Pagination
					currentPage={currentPage}
					totalCount={repositories.length}
					pageSize={PageSize}
					onPageChange={setCurrentPage}
				/>
			</div>
		</>
	);
};
