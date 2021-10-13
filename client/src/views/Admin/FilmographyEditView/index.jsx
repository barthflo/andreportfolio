import React, { useEffect } from 'react';
import Card from '../../../components/Card';
import Page from '../../../components/Page';
import Section from '../../../components/Section';
import Loading from '../../../components/Loading';
import FilmoForm from './FilmoForm';
import useAppContext from '../../../hooks/useAppContext';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import styled from 'styled-components';

const FilmographyEditView = ({
	match: {
		params: { slug },
	},
}) => {
	const { height } = useWindowDimensions();
	const { filmographyItem, siteSettings, actions, dispatch } = useAppContext();

	console.log(filmographyItem);
	useEffect(() => {
		actions.getSingleFilmography(dispatch, slug);
		return () => dispatch({ type: 'RESET_FILM_DETAIL' });
	}, [actions, dispatch, slug]);

	return (
		<Page
			title={`Dashboard - Profile - ${
				siteSettings
					? siteSettings.siteTitle + ' - ' + siteSettings.siteSubtitle
					: 'Loading'
			}`}
			description="Administration dashboard user settings page "
		>
			<Section
				minHeight={(height - 70).toString() + 'px'}
				flex
				flexDirection="column"
				justifyContent="start"
				alignItems="start"
				admin
			>
				<Title>Edit Film</Title>
				{!filmographyItem ? (
					<LoadingWrapper>
						<Loading />
					</LoadingWrapper>
				) : (
					<Card>
						<FilmoForm film={filmographyItem} />

						{/* {user && <ProfileForm user={user} dispatch={dispatch} />} */}
					</Card>
				)}
			</Section>
		</Page>
	);
};

const LoadingWrapper = styled.div`
	z-index: -1;
	position: fixed;
	top: 0;
	left: 0;
`;

const Title = styled.h1`
	font-size: 2em;
	margin-bottom: 20px;
`;

export default FilmographyEditView;
