import React, { useEffect, useState } from 'react';
import useAppContext from '../../../hooks/useAppContext';
import Page from '../../../components/Page';
import Loading from '../../../components/Loading';
import Section from '../../../components/Section';
import CardFilmo from '../../../components/CardFilmo';
import styled from 'styled-components';
import BasedButton from '../../../components/Button';
import { useHistory } from 'react-router';
import SnackBar from '../../../components/SnackBar';

const FilmographyListView = () => {
	const { filmographyList, siteSettings, actions, dispatch } = useAppContext();
	const {
		push,
		location: { state },
	} = useHistory();

	const [notif, setNotif] = useState(state ? state.notif : null);

	useEffect(() => {
		if (!filmographyList) {
			actions.getMultipleFilmography(dispatch);
		}
	}, [filmographyList, actions, dispatch]);

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
			title={`Dashboard - Filmography List - ${
				siteSettings
					? siteSettings.siteTitle + ' - ' + siteSettings.siteSubtitle
					: 'Loading'
			}`}
			description={`Administration dashboard filmography list page `}
		>
			{!filmographyList ? (
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
							<h1>Filmography List</h1>
							<BasedButton
								label="Add New"
								minWidth="fit-content"
								// width="100%"
								dark
								variant="secondary"
								onClick={() => push('/admin/filmography/create')}
							/>
						</Header>

						<Container>
							{filmographyList.map((film) => (
								<CardWrapper key={film.id}>
									<CardFilmo film={film} heading="h2" margin />
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
	flex-grow: 1;
	@media (min-width: ${(props) => props.theme.breakpoints.md}) {
		width: 400px;
	}
`;

export default FilmographyListView;
