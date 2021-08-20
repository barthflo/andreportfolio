import React, { useEffect, useState } from 'react';
import useAppContext from '../../hooks/useAppContext';
import styled from 'styled-components';
import { RiStarSFill } from 'react-icons/ri';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const Filmography = () => {
	const [loading, setLoading] = useState(true);
	const [paddingTop, setPaddingTop] = useState(0);
	const { width } = useWindowDimensions();

	const {
		siteSettings,
		// home: { filmography },
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

			{!loading && <Container></Container>}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: ${(props) => props.padding}px 0 70px 0;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: 300;
	& h2 {
		font-weight: 600;
		margin-bottom: 25px;
		font-style: capitalize;
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
	height: 70px;
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
	flex-direction: column;
`;

export default Filmography;
