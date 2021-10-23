import React, { useEffect } from 'react';
import styled from 'styled-components';
import Page from '../../../components/Page';
import Section from '../../../components/Section';
import useAppContext from '../../../hooks/useAppContext';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import Infos from './Infos';
import Messages from './Messages';
import Loading from '../../../components/Loading';

const HomeView = () => {
	const { siteSettings, actions, dispatch, messages } = useAppContext();
	const { height, width } = useWindowDimensions();

	useEffect(() => {
		actions.getMessages(dispatch, '?read=0');
	}, [actions, dispatch]);

	return (
		<Page
			title={`Dashboard - Home - ${
				siteSettings
					? siteSettings.siteTitle + ' - ' + siteSettings.siteSubtitle
					: 'Loading'
			}`}
			description="Administration dashboard home page "
		>
			{!messages ? (
				<LoadingWrapper>
					<Loading />
				</LoadingWrapper>
			) : (
				<Section
					minHeight={(height - 70).toString() + 'px'}
					flex
					flexDirection={width < 990 ? 'column' : 'row'}
					justifyContent={width < 990 ? 'start' : 'space-between'}
					alignItems={width < 990 ? 'start' : 'center'}
					admin
				>
					<Title>
						Welcome {JSON.parse(localStorage.getItem('user')).fullname}!
					</Title>
					<CardsContainer>
						<Messages messagesCount={messages.length} />
						<Infos />
					</CardsContainer>
				</Section>
			)}
		</Page>
	);
};

const LoadingWrapper = styled.div`
	z-index: -1;
`;

const Title = styled.h1`
	font-size: 4em;
	max-width: 300px;
	margin: 10px 0 20px 0;
	@media (min-width: ${(props) => props.theme.breakpoints.xs}) {
		max-width: unset;
		font-size: 5em;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		font-size: 5.2em;
		width: 50%;
		padding: 0 10px;
		margin-right: 10px;
	}
	@media (min-width: 1140px) {
		font-size: 5.8em;
		max-width: fit-content;
		overflow-wrap: break-word;
	}
`;

const CardsContainer = styled.article`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	@media (min-width: ${(props) => props.theme.breakpoints.md}) {
		width: 50%;
		margin-left: 10px;
	}
`;
export default HomeView;
