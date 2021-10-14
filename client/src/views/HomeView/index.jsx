import React, { useEffect } from 'react';
import styled from 'styled-components';
import useAppContext from '../../hooks/useAppContext';
import Loading from '../../components/Loading';
import Page from '../../components/Page';
import Section from '../../components/Section';
import Intro from './Intro';
import About from './About';
import Filmography from './Filmography';
import Skills from './Skills';
import Contact from './Contact';

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
	{
		component: <Filmography />,
		id: 'filmography',
	},
	{
		component: <Skills />,
		id: 'skills',
		light: true,
	},
	{
		component: <Contact />,
		id: 'contact',
	},
];

const HomeView = () => {
	const { home, siteSettings, actions, dispatch } = useAppContext();

	useEffect(() => {
		if (!home) {
			actions.getHomePageDatas(dispatch);
		}
	}, [home, actions, dispatch]);

	console.log(home);

	return (
		<Page
			title={`${
				siteSettings
					? siteSettings.siteTitle + ' - ' + siteSettings.siteSubtitle
					: 'Loading'
			} - Home`}
			description={`Home page of the portfolio of ${
				siteSettings && siteSettings.userName
			}, filmmaker. ${
				siteSettings && siteSettings.userName
			} is an aspiring writer and director`}
		>
			{!home ? (
				<LoadingWrapper>
					<Loading />
				</LoadingWrapper>
			) : (
				sections.map((section, index) => (
					<Section
						id={section.id}
						light={section.light}
						height={section.height}
						key={index}
					>
						{section.component}
					</Section>
				))
			)}
		</Page>
	);
};

const LoadingWrapper = styled.div`
	z-index: -1;
`;

export default HomeView;
