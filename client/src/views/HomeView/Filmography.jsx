import React, { useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import useAppContext from '../../hooks/useAppContext';
import styled from 'styled-components';
import { RiStarSFill } from 'react-icons/ri';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import CardFilmo from '../../components/CardFilmo';

const Filmography = () => {
	const [loading, setLoading] = useState(true);
	const [paddingTop, setPaddingTop] = useState(0);
	const { width } = useWindowDimensions();

	const {
		siteSettings,
		home: { filmography },
	} = useAppContext();

	useEffect(() => {
		if (siteSettings) {
			setLoading(false);
		}
	}, [siteSettings]);

	useEffect(() => {
		if (!loading) {
			let height;
			if (width < 768) {
				height =
					document.getElementById('profilePic').getBoundingClientRect().height -
					200;
			} else {
				height = 0;
			}
			setPaddingTop(height);
		}
	}, [width, loading]);

	return (
		<Wrapper padding={paddingTop}>
			<StarContainer>
				<Star />
			</StarContainer>
			<h2>Filmography</h2>

			<Container>
				{filmography.map((film) => (
					<CardWrapper key={film.id}>
						<CardFilmo film={film} heading="h3" />
					</CardWrapper>
				))}
			</Container>
			<Link to="/filmography">See all filmography</Link>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: ${(props) => props.padding}px 0 30px 0;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: 300;
	& h2 {
		font-weight: 600;
		margin-bottom: 45px;
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
	margin-bottom: 20px;
`;

const CardWrapper = styled.div`
	width: 350px;
	flex-grow: 1;
`;

const Link = styled(HashLink)`
	font-size: 12px;
	font-style: italic;
	align-self: flex-end;
	margin-top: 10px;
	cursor: pointer;
	transition: 0.2s ease-in;
	&:hover {
		color: ${(props) => props.theme.palette.action.hover};
		transition: 0.2s ease-in;
	}
`;

export default Filmography;
