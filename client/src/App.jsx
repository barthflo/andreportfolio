import React, { useEffect } from 'react';
import styled from 'styled-components';
import useAppContext from './hooks/useAppContext';
import RenderRoutes, { routes } from './components/RenderRoutes';
import Loading from './components/Loading';
import { useHistory } from 'react-router-dom';

function App() {
	const { initialized, error } = useAppContext();
	const { push } = useHistory();

	useEffect(() => {
		if (error) {
			push(`/${error.status}`);
		}
	}, [error, push]);

	return (
		<>
			{!initialized && !error && (
				<LoaderWrapper>
					<Loading />
				</LoaderWrapper>
			)}
			<RenderRoutes routes={routes} />
		</>
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
