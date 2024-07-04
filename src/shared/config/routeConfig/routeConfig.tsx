import { GitRepoPage } from '@/pages/GitRepoPage';
import { MainPage } from '@/pages/MainPage';
import { RouteProps } from 'react-router-dom';

export enum AppRoutes {
	MAIN = '/',
	REPO_PAGE = '/repo-info/:owner/:name',
}

export const routeConfig: Record<string, RouteProps> = {
	[AppRoutes.MAIN]: {
		path: AppRoutes.MAIN,
		element: <MainPage />,
	},
	[AppRoutes.REPO_PAGE]: {
		path: AppRoutes.REPO_PAGE,
		element: <GitRepoPage />,
	},
};
