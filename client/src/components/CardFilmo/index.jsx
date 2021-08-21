import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { HashLink as Link } from 'react-router-hash-link';

const CardFilmo = ({ film }) => {
	const [overflow, setOverflow] = useState(false);
	const { urls, title, date, synopsis } = film;
	// eslint-disable-next-line array-callback-return
	const picture = urls.filter((url) => {
		const extension = url.split('.').pop().split('?').shift();
		if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
			return url;
		}
	})[0];

	return (
		<Container>
			<Link to={`/filmography/${film.title.toLowerCase()}`}>
				<ImageContainer>
					<Image src={picture} alt={`Picture frame from the movie ${title}`} />
				</ImageContainer>
			</Link>
			<CardInfosContainer overflow={overflow}>
				<Link to={`/filmography/${film.title.toLowerCase()}`}>
					<Title heading={3}>
						{title} ({date})
					</Title>
				</Link>
				<Description>
					{overflow ? synopsis : synopsis.slice(0, 150) + '...'}
				</Description>
				<Button onClick={() => setOverflow(!overflow)}>
					{overflow ? 'collapse' : 'read more'}
				</Button>
			</CardInfosContainer>
		</Container>
	);
};

const Container = styled.article`
	width: 100%;
	margin-bottom: 20px;
	@media (min-width: ${(props) => props.theme.breakpoints.xs}) {
		padding: 0 5px;
	}
`;

const ImageContainer = styled.figure`
	width: 100%;
	height: 350px;
	margin-bottom: 7px;
	box-shadow: ${(props) => props.theme.shadows.bottom};
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const CardInfosContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: ${(props) => (props.overflow ? 'start' : 'space-around')};
	overflow: ${(props) => props.overflow && 'scroll'};
	padding: 20px;
	align-items: center;
	background: ${(props) => props.theme.palette.background.surface.primary};
	color: ${(props) => props.theme.palette.text.secondary.light};
	height: 175px;
	box-shadow: ${(props) => props.theme.shadows.bottom};
`;

const Title = styled.h3`
	font-weight: 600;
	font-size: 20px;
	margin-bottom: 16px;
	text-align: center;
	text-transform: capitalize;
	transition: 0.2s ease-in;
	&:hover {
		color: ${(props) => props.theme.palette.action.hover};
		transition: 0.2s ease-in;
	}
`;

const Description = styled.p`
	font-weight: 300;
	font-size: 14px;
	text-align: justify;
`;

const Button = styled.span`
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

CardFilmo.propTypes = {
	film: PropTypes.object.isRequired,
};

export default CardFilmo;
