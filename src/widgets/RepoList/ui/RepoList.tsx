import { useRepositoryStore } from '@/Features/repositoryDetails/model/store/useRepositoryStore';
import { PAGE_SIZE } from '@/shared/const/common';
import { Card } from '@/widgets/Card/ui/Card';
import { Pagination } from '@/widgets/Pagination';
import { useEffect, useMemo, useState } from 'react';
import cls from './RepoList.module.scss';

export const RepoList = () => {
	const { repositories } = useRepositoryStore();
	const [currentPage, setCurrentPage] = useState(() => {
		const savedPage = localStorage.getItem('currentPage');
		return savedPage ? Number(savedPage) : 1;
	});

	useEffect(() => {
		localStorage.setItem('currentPage', currentPage.toString());
	}, [currentPage]);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
		const lastPageIndex = firstPageIndex + PAGE_SIZE;
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
					pageSize={PAGE_SIZE}
					onPageChange={setCurrentPage}
				/>
			</div>
		</>
	);
};
