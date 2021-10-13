import React, { useEffect } from 'react';
import useAppContext from '../../../hooks/useAppContext';
import Page from '../../../components/Page';
import Loading from '../../../components/Loading';
import Section from '../../../components/Section';
import CardFilmo from '../../../components/CardFilmo';
import styled from 'styled-components';

const FilmographyListView = () => {
	const { filmographyList, siteSettings, actions, dispatch } = useAppContext();

	useEffect(() => {
		if (!filmographyList) {
			actions.getMultipleFilmography(dispatch);
		}
	}, [filmographyList, actions, dispatch]);

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
					<Wrapper>
						<h1>Filmography List</h1>

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
