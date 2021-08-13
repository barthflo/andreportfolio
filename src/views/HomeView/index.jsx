import React, { useEffect } from 'react';
import useAppContext from '../../hooks/useAppContext';
import Loading from '../../components/Loading';

const HomeView = () => {
	const { home, actions, dispatch } = useAppContext();

	useEffect(() => {
		if (!home) {
			setTimeout(() => {
				actions.getHomePageDatas(dispatch);
			}, 2000);
		}
	}, [home, actions, dispatch]);

	return (
		<div>
			{!home ? (
				<div
					style={{
						width: '100vw',
						height: '80vh',
						marginTop: '20vh',
						position: 'relative',
					}}
				>
					<Loading />
				</div>
			) : (
				home.title
			)}
		</div>
	);
};

export default HomeView;
