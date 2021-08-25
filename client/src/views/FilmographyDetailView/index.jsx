import React, { useEffect } from 'react';
import useAppContext from '../../hooks/useAppContext';
import Page from '../../components/Page';
import Loading from '../../components/Loading';
import Section from '../../components/Section';
import styled from 'styled-components';
import VideoPlayer from './VideoPlayer';
import Thumbs from './Thumbs';
import Infos from './Infos';

const FilmographyDetailView = ({
	match: {
		params: { slug },
	},
}) => {
	window.scrollTo(0, 0);
	const { filmographyItem, actions, dispatch } = useAppContext();

	const getVideoUrl = () => {
		const videoUrl = filmographyItem.urls.filter((url) =>
			url.includes('video'),
		);
		return videoUrl[0];
	};
	const getPicturesUrls = () => {
		const picturesUrls = filmographyItem.urls.filter((url) =>
			url.includes('images'),
		);
		return picturesUrls;
	};

	useEffect(() => {
		actions.getSingleFilmography(dispatch, slug);
		return () => dispatch({ type: 'RESET_FILM_DETAIL' });
	}, [actions, dispatch, slug]);

	return (
		<Page
			title={`Andre Fonseca - Filmmaker - ${slug
				.trim()
				.replace(/^\w/, (c) => c.toUpperCase())} trailer and infos`}
			description={`Trailer and informations about the movie ${slug
				.trim()
				.replace(/^\w/, (c) => c.toUpperCase())}`}
		>
			{!filmographyItem ? (
				<LoadingWrapper>
					<Loading />
				</LoadingWrapper>
			) : (
				<Wrapper>
					<h1>{slug}</h1>
					<VideoPlayer
						videoUrl={getVideoUrl()}
						pictureUrl={getPicturesUrls()[0]}
					/>
					<Thumbs pictures={getPicturesUrls()} slug={slug} />
					<Section>
						<Infos film={filmographyItem} />
					</Section>
				</Wrapper>
			)}
		</Page>
	);
};

const LoadingWrapper = styled.div`
	z-index: -1;
`;

const Wrapper = styled.div`
	padding: 1vh 0 2vh;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: 300;
	& h1 {
		padding: 0 13px;
		font-weight: 600;
		text-transform: capitalize;
		text-align: center;
		font-size: 36px;
		margin-bottom: 20px;
		color: ${(props) => props.theme.palette.text.secondary.light};
		@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
			font-size: 48px;
		}
		@media (min-width: ${(props) => props.theme.breakpoints.md}) {
			font-size: 56px;
		}
	}
`;

export default FilmographyDetailView;
