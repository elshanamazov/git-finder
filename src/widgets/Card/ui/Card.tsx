import { REPO_PAGE_ROUTE } from '@/shared/const/common';
import { formatDate } from '@/shared/helper/formatDate';
import { Link, generatePath } from 'react-router-dom';
import cls from './Card.module.scss';

type RepoProps = {
	id: string;
	name: string;
	html_url?: string;
	pushed_at: string;
	stargazers_count: number | undefined;
};

export const Card = ({ name, html_url, pushed_at, stargazers_count }: RepoProps) => {
	const formattedDate = formatDate(pushed_at);
	const newName = name.length > 15 ? name.slice(0, 15) + '...' : name;

	const usernameRegex = /https:\/\/github\.com\/([^/]+)/;
	const match = html_url?.match(usernameRegex);
	const username = match ? match[1] : '';

	return (
		<div className={cls.repo_card}>
			<h2>
				<a
					target="_blank"
					href={html_url}
					rel="noreferrer"
					className={cls.name_repo}
					title={html_url || 'URL not provided'}>
					{newName}
				</a>
			</h2>
			<div className={cls.description_block}>
				<div>
					<p>Last commit - {formattedDate}</p>
					<p>Stars at the repository - {stargazers_count}</p>
				</div>
				{username && (
					<p className={cls.link}>
						<Link to={generatePath(REPO_PAGE_ROUTE, { owner: username, name })}>More...</Link>
					</p>
				)}
			</div>
		</div>
	);
};
