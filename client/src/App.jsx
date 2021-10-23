import React, { useEffect } from 'react';
import styled from 'styled-components';
import useAppContext from './hooks/useAppContext';
import RenderRoutes, { routes } from './components/RenderRoutes';
import Loading from './components/Loading';
import { useHistory } from 'react-router-dom';
import useAuth from './hooks/useAuth';

function App() {
	const { initialized, error } = useAppContext();
	const { dispatch } = useAuth();
	const { push } = useHistory();

	useEffect(() => {
		if (error) {
			if (error.status === 403) {
				dispatch({ type: 'INITIALIZE' });
			}
			push(`/${error.status}`);
		}
	}, [error, push, dispatch]);

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
