/* eslint-disable no-mixed-spaces-and-tabs */
import usePagination, { DOTS } from '@/shared/lib/hooks/usePagination';
import classnames from 'classnames';
import cls from './Pagination.module.scss';

interface PaginationProps {
	onPageChange: (page: number) => void;
	totalCount: number;
	siblingCount?: number;
	currentPage: number;
	pageSize: number;
	className?: string;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
	const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props;
	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	if (!paginationRange || currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	const lastPage = paginationRange[paginationRange.length - 1];
	const lastPageNumber = typeof lastPage === 'number' ? lastPage : 1;

	return (
		<ul className={classnames(cls.paginationContainer, className)}>
			<li
				className={classnames(cls.paginationItem, { [cls.disabled]: currentPage === 1 })}
				onClick={
					currentPage > 1
						? () => {
								onPrevious();
						  }
						: undefined
				}>
				<div className={`${cls.arrow} ${cls.left}`} />
			</li>
			{paginationRange.map((pageNumber, index) => {
				if (pageNumber === DOTS) {
					return (
						<li className={classnames(cls.paginationItem, cls.dots)} key={index}>
							&#8230;
						</li>
					);
				}

				if (typeof pageNumber === 'number') {
					return (
						<li
							className={classnames(cls.paginationItem, {
								[cls.selected]: pageNumber === currentPage,
							})}
							onClick={() => {
								onPageChange(pageNumber);
							}}
							key={index}>
							{pageNumber}
						</li>
					);
				}

				return null;
			})}
			<li
				className={classnames(cls.paginationItem, {
					[cls.disabled]: currentPage === lastPageNumber,
				})}
				onClick={
					currentPage < lastPageNumber
						? () => {
								onNext();
						  }
						: undefined
				}>
				<div className={`${cls.arrow} ${cls.right}`} />
			</li>
		</ul>
	);
};
