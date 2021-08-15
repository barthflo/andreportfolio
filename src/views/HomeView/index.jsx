import React, { useEffect } from 'react';
import useAppContext from '../../hooks/useAppContext';
import Loading from '../../components/Loading';
import Page from '../../components/Page';
import Section from '../../components/Section';

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
					<Section>
						<div style={{ height: '100vh' }}>Image</div>
					</Section>

					<Section id="about" light>
						<div style={{ height: '100vh', paddingTop: 70 }}>About</div>
					</Section>
					<Section id="filmography">
						<div style={{ height: '100vh', paddingTop: 70 }}>Filmo</div>
					</Section>
				</>
			)}
		</Page>
	);
};

export default HomeView;
