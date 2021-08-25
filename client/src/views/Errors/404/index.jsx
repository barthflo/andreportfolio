import React from 'react';
import Page from '../../../components/Page';
import Section from '../../../components/Section';
import styled from 'styled-components';
import { HashLink } from 'react-router-hash-link';

const index = () => {
	return (
		<Page
			title="404 - Page not found"
			description="The page you are asking for doesn't exists"
		>
			<Section
				height="100vh"
				gradient
				flex
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
			>
				<Title>
					<span>404</span>
					Page Not Found
				</Title>
				<AnimatedGif src={`${process.env.PUBLIC_URL}/megaphone.gif`} />
				<Subtitle>
					The page you're looking for doesn't exists. Are you sure you entered
					the correct URL?
				</Subtitle>
				<Button to="/">Go back to the website</Button>
			</Section>
		</Page>
	);
};

const Title = styled.h1`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 20px;
	& > span {
		font-family: ${(props) => props.theme.typography.opening.title};

		font-size: 48px;
	}
`;

const Subtitle = styled.p`
	margin-top: 30px;
	text-align: center;
`;

const AnimatedGif = styled.img`
	width: 150px;
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		width: 200px;
	}
`;
const Button = styled(HashLink)`
	margin-top: 30px;
	min-width: 100%;
	padding: 7px;
	color: ${(props) => props.theme.palette.text.secondary.dark};
	background: ${(props) => props.theme.palette.background.surface.secondary};
	border: 1px solid ${(props) => props.theme.palette.border};
	box-shadow: ${(props) => props.theme.shadows.bottom};
	text-align: center;
	text-transform: capitalize;
	@media (min-width: ${(props) => props.theme.breakpoints.xs}) {
		min-width: 230px;
`;

export default index;
