import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useAppContext from '../../hooks/useAppContext';
import useWindowScrollPosition from '../../hooks/useWindowScrollPosition';
import ReactPlayer from 'react-player';

const Intro = () => {
	const {
		siteSettings,
		home: {
			video: { video, picture },
		},
	} = useAppContext();
	const [loading, setLoading] = useState(true);
	const [poster, setPoster] = useState(false);
	const scrollPosition = useWindowScrollPosition();

	useEffect(() => {
		if (siteSettings) {
			setLoading(false);
		}
	}, [siteSettings]);

	return (
		<>
			{!loading && (
				<>
					{poster ? (
						<Poster src={picture} />
					) : (
						<Video
							url={video}
							playing
							loop
							muted
							playsinline
							onError={(e) => setPoster(true)}
						/>
					)}
					<TitleContainer scroll={scrollPosition}>
						<Title>{siteSettings.siteTitle}</Title>
						<Subtitle>{siteSettings.siteSubtitle}</Subtitle>
					</TitleContainer>
				</>
			)}
		</>
	);
};

const Video = styled(ReactPlayer)`
	position: absolute;
	top: 0;
	left: 0;
	height: 100% !important;
	width: 100vw !important;
	& > video {
		height: 100%;
		width: 100%;
		object-fit: none;
	}
`;

const Poster = styled.img`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	object-fit: cover;
`;
const TitleContainer = styled.div`
	background: rgba(0, 0, 0, 0.3);
	position: absolute;
	height: 100%;
	width: 100vw;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.palette.text.primary};
	& * {
		opacity: ${(props) => (props.scroll > 200 ? '0' : '1')};
		transition: 0.2s ease-in-out;
	}
`;

const Title = styled.h1`
	font-family: ${(props) => props.theme.typography.opening.title};
	font-size: 64px;
	text-transform: uppercase;
	text-align: center;
	line-height: 1.1;
	margin-bottom: 16px;
	@media (min-width: ${(props) => props.theme.breakpoints.md}) {
		font-size: 75px;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.lg}) {
		font-size: 96px;
	}
	&:before {
		content: '';
		height: 2px;
		width: 130px;
		background: ${(props) => props.theme.palette.text.primary};
		display: block;
		margin: 0 auto 24px;
		@media (min-width: ${(props) => props.theme.breakpoints.md}) {
			width: 175px;
		}
		@media (min-width: ${(props) => props.theme.breakpoints.lg}) {
			width: 200px;
		}
	}
`;

const Subtitle = styled.span`
	font-family: ${(props) => props.theme.typography.opening.subtitle};
	font-size: 24px;
	font-weight: 600;
	text-transform: capitalize;

	@media (min-width: ${(props) => props.theme.breakpoints.md}) {
		font-size: 36px;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.lg}) {
		font-size: 48px;
	}
`;

export default Intro;
