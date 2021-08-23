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
import { useHistory } from 'react-router-dom';

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
	const { home, actions, dispatch, error } = useAppContext();
	const { push } = useHistory();

	useEffect(() => {
		if (!home) {
			actions.getHomePageDatas(dispatch);
		}
	}, [home, actions, dispatch]);

	useEffect(() => {
		if (error) {
			console.log(error);
			push(`/${error.status}`);
		}
	}, [error, push]);

	return (
		<Page
			title="Andre Fonseca - Filmmaker"
			description="Home page of the portfolio of Andre Salgado Fonseca,filmmaker. Andre Fonsecca is an aspiring writer and director"
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
