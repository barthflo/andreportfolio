import React, { useEffect, useState } from 'react';
import useAppContext from '../../hooks/useAppContext';
import styled from 'styled-components';
import { RiStarSFill } from 'react-icons/ri';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const About = () => {
	const [loading, setLoading] = useState(true);
	const { width } = useWindowDimensions();
	const {
		siteSettings,
		home: { about },
	} = useAppContext();

	useEffect(() => {
		if (siteSettings) {
			setLoading(false);
		}
	}, [siteSettings]);

	return (
		<Wrapper>
			<StarContainer>
				<Star />
			</StarContainer>
			{width < 768 && <h2>About Me</h2>}

			{!loading && (
				<Container>
					<ImageContainer id="profilePic">
						<Image
							src={about.profilePic}
							alt={`Portrait of ${siteSettings.userName} `}
						/>
					</ImageContainer>

					<Content>
						{width >= 768 && <h2>About Me</h2>}
						<p>{about.content}</p>
					</Content>
				</Container>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 10vh 0 200px;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: 300;
	& h2 {
		font-weight: 600;
		margin-bottom: 25px;
		text-transform: capitalize;
		font-size: 36px;
		@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
			font-size: 48px;
		}
		@media (min-width: ${(props) => props.theme.breakpoints.md}) {
			font-size: 56px;
		}
	}
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		padding: 10vh 0;
	}
`;

const StarContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
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
	display: flex;
	flex-direction: column-reverse;
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		flex-direction: row;
	}
`;

const ImageContainer = styled.figure`
	position: absolute;
	width: 100%;
	padding-top: 100%;
	@media (min-width: ${(props) => props.theme.breakpoints.xs}) {
		padding-top: 350px;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		padding-top: unset;
		width: 40%;
		height: 98%;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.md}) {
		width: 35%;
		max-width: 340px;
		padding-right: 100px;
	}
`;

const Image = styled.img`
	position: absolute;
	width: 100%;
	height: 100%;
	object-fit: cover;
	border: 10px solid ${(props) => props.theme.palette.background.paper};
	@media (min-width: ${(props) => props.theme.breakpoints.xs}) {
		object-position: 0 -100px;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		object-position: center;
	}
`;

const Content = styled.div`
	text-align: justify;
	margin-bottom: 10px;
	font-size: 18px;
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		width: 60%;
		margin-left: 40%;
		padding-left: 20px;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.md}) {
		width: 65%;
		margin-left: 35%;
		padding-left: 100px;
	}
`;

export default About;
