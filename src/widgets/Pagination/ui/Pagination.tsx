import { DOTS } from '@/shared/const/common';
import usePagination from '@/shared/lib/hooks/usePagination';
import classnames from 'classnames';
import { FC, useCallback, useMemo } from 'react';
import cls from './Pagination.module.scss';

interface PaginationProps {
	onPageChange: (page: number) => void;
	totalCount: number;
	siblingCount?: number;
	currentPage: number;
	pageSize: number;
	className?: string;
}

export const Pagination: FC<PaginationProps> = ({
	onPageChange,
	totalCount,
	siblingCount = 1,
	currentPage,
	pageSize,
	className,
}) => {
	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	const onNext = useCallback(() => {
		onPageChange(currentPage + 1);
	}, [currentPage, onPageChange]);

	const onPrevious = useCallback(() => {
		onPageChange(currentPage - 1);
	}, [currentPage, onPageChange]);

	const handlePageClick = useCallback(
		(pageNumber: number) => {
			onPageChange(pageNumber);
		},
		[onPageChange],
	);

	const itemClass = useCallback(
		(pageNumber: number) =>
			classnames(cls.paginationItem, {
				[cls.selected]: pageNumber === currentPage,
			}),
		[currentPage],
	);

	const lastPage = useMemo(() => {
		if (paginationRange && paginationRange.length > 0) {
			const lastPageItem = paginationRange[paginationRange.length - 1];
			return typeof lastPageItem === 'number' ? lastPageItem : 0;
		}
		return 0;
	}, [paginationRange]);

	return (
		<ul className={classnames(cls.paginationContainer, className)}>
			<li
				className={classnames(cls.paginationItem, { [cls.disabled]: currentPage === 1 })}
				onClick={currentPage > 1 ? onPrevious : undefined}
				aria-disabled={currentPage === 1}>
				<div className={`${cls.arrow} ${cls.left}`} />
			</li>
			{paginationRange?.map((pageNumber, index) => {
				if (pageNumber === DOTS) {
					return (
						<li className={classnames(cls.paginationItem, cls.dots)} key={index}>
							&#8230;
						</li>
					);
				}

				return (
					<li
						className={itemClass(pageNumber as number)}
						onClick={() => handlePageClick(pageNumber as number)}
						key={index}>
						{pageNumber}
					</li>
				);
			})}
			<li
				className={classnames(cls.paginationItem, {
					[cls.disabled]: currentPage === lastPage,
				})}
				onClick={currentPage < lastPage ? onNext : undefined}
				aria-disabled={currentPage === lastPage}>
				<div className={`${cls.arrow} ${cls.right}`} />
			</li>
		</ul>
	);
};
