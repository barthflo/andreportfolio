import React from 'react';
import styled from 'styled-components';
import useAppContext from './hooks/useAppContext';
import { Redirect } from 'react-router';
import RenderRoutes, { routes } from './components/RenderRoutes';
import Loading from './components/Loading';

function App() {
	const { error, initialized } = useAppContext();

	if (error && error.status === 404) return <Redirect to="/404" />;

	return (
		<div className="App">
			{!initialized && (
				<LoaderWrapper>
					<Loading />
				</LoaderWrapper>
			)}
			<RenderRoutes routes={routes} />
		</div>
	);
}

const LoaderWrapper = styled.div`
	height: 100vh;
	width: 100vw;
	position: fixed;
	top: 0;
	z-index: 2000;
`;

export default App;
