import React, { useEffect, useState } from 'react';
import useAppContext from '../../../hooks/useAppContext';
import Page from '../../../components/Page';
import Loading from '../../../components/Loading';
import Section from '../../../components/Section';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import SnackBar from '../../../components/SnackBar';
import Card from '../../../components/Card';
import CVForm from './CVForm';

const CVEditView = () => {
	const { home, siteSettings, actions, dispatch } = useAppContext();
	const {
		location: { state },
	} = useHistory();

	const [notif, setNotif] = useState(state ? state.notif : null);

	useEffect(() => {
		if (!home) {
			actions.getHomePageDatas(dispatch);
		}
	}, [home, actions, dispatch]);

	console.log(home);
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
			title={`Dashboard - Resume - ${
				siteSettings
					? siteSettings.siteTitle + ' - ' + siteSettings.siteSubtitle
					: 'Loading'
			}`}
			description={`Administration dashboard edit resume `}
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
							<h1>Your Resume</h1>
						</Header>

						<Container>
							<Card>
								<CVForm cv={home.cv} />
							</Card>
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

export default CVEditView;
