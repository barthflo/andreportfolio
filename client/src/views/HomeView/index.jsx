import React, { useEffect } from 'react';
import useAppContext from '../../hooks/useAppContext';
import Loading from '../../components/Loading';
import Page from '../../components/Page';
import Section from '../../components/Section';
import Intro from './Intro';
import About from './About';

const sections = [
	{
		component: <Intro />,
		height: '90vh',
	},
	{
		component: <About />,
		id: 'about',
		light: true,
	},
];

const HomeView = () => {
	const { home, actions, dispatch, error } = useAppContext();

	useEffect(() => {
		if (!home) {
			actions.getHomePageDatas(dispatch);
		}
	}, [home, actions, dispatch]);
	if (error) {
		console.log(error);
	}
	return (
		<Page
			title="Andre Fonsecca - Filmmaker"
			description="Home page of the portfolio of Andre Fonsecca Filmmaker. Andre Fonsecca is an aspiring writer and director"
		>
			{!home ? (
				<div style={{ zIndex: -1 }}>
					<Loading />
				</div>
			) : (
				sections.map((section, index) => (
					<Section
						id={section.id && section.id}
						light={section.light && section.light}
						height={section.height}
						key={index}
					>
						{section.component}
					</Section>
				))
				// <>
				// 	<Section>
				// 		<div style={{ height: '100vh' }}>Image</div>
				// 	</Section>

				// 	<Section id="about" light>
				// 		<div style={{ height: '100vh', paddingTop: 70 }}>About</div>
				// 	</Section>
				// 	<Section id="filmography">
				// 		<div style={{ height: '100vh', paddingTop: 70 }}>Filmo</div>
				// 	</Section>
				// </>
			)}
		</Page>
	);
};

export default HomeView;
