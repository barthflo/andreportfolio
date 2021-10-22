import React, { useEffect, useState } from 'react';
import useAppContext from '../../../hooks/useAppContext';
import Page from '../../../components/Page';
import Loading from '../../../components/Loading';
import Section from '../../../components/Section';
import styled from 'styled-components';
import BasedButton from '../../../components/Button';
import { useHistory } from 'react-router';
import SnackBar from '../../../components/SnackBar';
import Table from './Table';

const SkillsListView = () => {
	const { home, siteSettings, actions, dispatch } = useAppContext();
	const {
		push,
		location: { state },
	} = useHistory();

	const [notif, setNotif] = useState(state ? state.notif : null);

	const updateNotifState = (nextState) => {
		setNotif(nextState);
	};

	useEffect(() => {
		if (!home) {
			actions.getHomePageDatas(dispatch);
		}
	}, [home, actions, dispatch]);

	useEffect(() => {
		let timeout;
		if (notif) {
			timeout = setTimeout(() => {
				setNotif(null);
			}, 5000);
		}
		return () => clearTimeout(timeout);
	}, [notif]);

	return (
		<Page
			title={`Dashboard - Skills List - ${
				siteSettings
					? siteSettings.siteTitle + ' - ' + siteSettings.siteSubtitle
					: 'Loading'
			}`}
			description={`Administration dashboard skills list page `}
		>
			{!home ? (
				<LoadingWrapper>
					<Loading />
				</LoadingWrapper>
			) : (
				<Section admin>
					{notif && (
						<SnackBar
							show={notif.display}
							content={notif.content}
							status={notif.status}
						/>
					)}
					<Wrapper>
						<Header>
							<h1>Skills List</h1>
							<BasedButton
								label="Add New"
								minWidth="fit-content"
								dark
								variant="secondary"
								onClick={() => push('/admin/skills/create')}
							/>
						</Header>

						<Container>
							{home.skills.map((skill, index) => (
								<CardWrapper key={index}>
									<Table
										category={skill.skill_group}
										skills={skill.skills}
										setNotif={updateNotifState}
									/>
								</CardWrapper>
							))}
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

const CardWrapper = styled.div`
	width: 350px;
	display: flex;
	align-items: stretch;
	flex-grow: 1;
	margin: 0 5px;
	@media (min-width: ${(props) => props.theme.breakpoints.md}) {
		width: 400px;
	}
`;

export default SkillsListView;
