import React, { useEffect } from 'react';
import useAppContext from '../../../hooks/useAppContext';
import Page from '../../../components/Page';
import Loading from '../../../components/Loading';
import Section from '../../../components/Section';
import Card from '../../../components/Card';
import Table from './Table';
import styled from 'styled-components';

// import Table from './Table';

const MessagesListView = () => {
	const { siteSettings, actions, dispatch, messages } = useAppContext();

	useEffect(() => {
		actions.getMessages(dispatch, '?');
	}, [actions, dispatch]);

	return (
		<Page
			title={`Dashboard - Messages - ${
				siteSettings
					? siteSettings.siteTitle + ' - ' + siteSettings.siteSubtitle
					: 'Loading'
			}`}
			description={`Administration dashboard messages list page `}
		>
			{!messages || !messages.length ? (
				<LoadingWrapper>
					<Loading />
				</LoadingWrapper>
			) : (
				<Section admin>
					<Wrapper>
						<Header>
							<h1>Your messages received</h1>
						</Header>

						<Container>
							<Card>
								<Table messageList={messages} />
							</Card>
							{/* {home.skills.map((skill, index) => (
								<CardWrapper key={index}>
									<Table category={skill.skill_group} skills={skill.skills} />
								</CardWrapper>
							))} */}
						</Container>
					</Wrapper>
				</Section>
			)}
		</Page>
	);
};

const LoadingWrapper = styled.div`
	z-index: -1;
`;

const Wrapper = styled.div`
	padding: 1vh 0;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: 300;
	& h1 {
		font-weight: 600;
		text-transform: capitalize;
		font-size: 2em;
		align-self: start;
		margin-bottom: 20px;
	}
`;

const Header = styled.header`
	width: 100%;
	display: flex;
	align-self: start;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	margin-bottom: 10px;
	& h1 {
		margin-bottom: 0;
		flex-grow: 1;
	}
`;

const Container = styled.div`
	margin-top: 10px;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

export default MessagesListView;
