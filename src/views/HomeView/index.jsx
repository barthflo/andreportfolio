import React, { useEffect } from 'react';
import useAppContext from '../../hooks/useAppContext';
import Loading from '../../components/Loading';
import Page from '../../components/Page';
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
		<Page
			title="Andre Fonsecca - Filmmaker"
			description="Home page of the portfolio of Andre Fonsecca Filmmaker. Andre Fonsecca is an aspiring writter and director"
		>
			{!home ? (
				<div style={{ zIndex: -1 }}>
					<Loading />
				</div>
			) : (
				<>
					<p>{home.title}</p>
					<div style={{ height: '100vh' }}>Image</div>
					<div id="about" style={{ height: '100vh', paddingTop: 70 }}>
						About
					</div>
					<div id="filmography" style={{ height: '100vh', paddingTop: 70 }}>
						Filmo
					</div>
				</>
			)}
		</Page>
	);
};

export default HomeView;
