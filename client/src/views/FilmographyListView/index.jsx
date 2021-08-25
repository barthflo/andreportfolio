import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import useAppContext from '../../hooks/useAppContext';
import Page from '../../components/Page';
import Loading from '../../components/Loading';
import Section from '../../components/Section';
import CardFilmo from '../../components/CardFilmo';
import { RiStarSFill } from 'react-icons/ri';
import styled from 'styled-components';
import { HashLink } from 'react-router-hash-link';

const FilmographyListView = () => {
	window.scrollTo(0, 0);
	const { filmographyList, actions, dispatch, error } = useAppContext();
	const { push } = useHistory();

	useEffect(() => {
		if (!filmographyList) {
			actions.getMultipleFilmography(dispatch);
		}
	}, [filmographyList, actions, dispatch]);

	useEffect(() => {
		if (error) {
			console.log(error);
			push(`/${error.status}`);
		}
	}, [error, push]);

	return (
		<Page
			title="Andre Fonseca - Filmmaker - Filmography"
			description="List of all the movies and short films directed or written by Andre Fonseca"
		>
			{!filmographyList ? (
				<LoadingWrapper>
					<Loading />
				</LoadingWrapper>
			) : (
				<Section>
					<Wrapper>
						<h1>Filmography</h1>
						<StarContainer>
							<Star />
						</StarContainer>
						<Container>
							{filmographyList.map((film) => (
								<CardWrapper key={film.id}>
									<CardFilmo film={film} heading="h2" />
								</CardWrapper>
							))}
						</Container>
						<Link to="/#filmography">Back to home page</Link>
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
		font-size: 36px;
		@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
			font-size: 48px;
		}
		@media (min-width: ${(props) => props.theme.breakpoints.md}) {
			font-size: 56px;
		}
	}
`;

const StarContainer = styled.div`
	width: 100%;
	height: 10vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Star = styled(RiStarSFill)`
	font-size: 20px;
	@media (min-width: ${(props) => props.theme.breakpoints.xs}) {
		font-size: 25px;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.md}) {
		font-size: 36px;
	}
`;

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const CardWrapper = styled.div`
	width: 350px;
	flex-grow: 1;
`;

const Link = styled(HashLink)`
	min-width: 100%;
	padding: 7px;
	color: ${(props) => props.theme.palette.text.secondary.dark};
	background: ${(props) => props.theme.palette.background.surface.secondary};
	border: 1px solid ${(props) => props.theme.palette.border};
	box-shadow: ${(props) => props.theme.shadows.bottom};
	text-align: center;
	text-transform: capitalize;
	@media (min-width: ${(props) => props.theme.breakpoints.xs}) {
	}
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		min-width: 230px;
		align-self: flex-end;
	}
`;

export default FilmographyListView;
