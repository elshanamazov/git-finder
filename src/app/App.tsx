import { routeConfig } from '@/shared/config/routeConfig/routeConfig';
import { Link, Route, Routes } from 'react-router-dom';
import './styles/index.scss';

function App() {
	return (
		<>
			<header className="header">
				<Link to="/">
					<h1>GitFinder</h1>
				</Link>
			</header>
			<main>
				<Routes>
					{Object.entries(routeConfig).map(([key, config]) => (
						<Route key={key} path={config.path} element={config.element} />
					))}
				</Routes>
			</main>
		</>
	);
}

export default App;
