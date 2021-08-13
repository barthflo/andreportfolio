import React from 'react';
import styled from 'styled-components';
import { HashLink as Link } from 'react-router-hash-link';
import useAppContext from './hooks/useAppContext';
import { Redirect } from 'react-router';
import RenderRoutes, { routes } from './components/RenderRoutes';
import Loading from './components/Loading';

const H1 = styled.h1`
	color: ${(props) => props.theme.palette.action.active};
	font-family: ${(props) => props.theme.typography.opening.title};
	font-size: 6vw;
`;

function App() {
	const { error, initialized } = useAppContext();

	if (error && error.status === 404) return <Redirect to="/404" />;

	return (
		<div className="App">
			{!initialized ? (
				<Loading />
			) : (
				<>
					<H1>Hello World</H1>
					<ul style={{ display: 'flex', justifyContent: 'space-around' }}>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/filmography">Filmography</Link>
						</li>
						<li>
							<Link to="/not-found">Page Not Found</Link>
						</li>
						<li>
							<Link to="/admin">Admin</Link>
						</li>
					</ul>
				</>
			)}
			<RenderRoutes routes={routes} />
		</div>
	);
}

export default App;
