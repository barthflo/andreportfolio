import React from 'react';
import Page from '../../../components/Page';
import Section from '../../../components/Section';
import styled from 'styled-components';
import { HashLink } from 'react-router-hash-link';

const Index = () => {
	return (
		<Page
			title="403 - Not Authorized"
			description="You are not allowed to see this page"
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
					<span>403</span>
					Your session has expired.
				</Title>
				<AnimatedGif src={`${process.env.PUBLIC_URL}/ticket.gif`} />
				<Subtitle>Try to login to access this page.</Subtitle>
				<Button to="/login">Login</Button>
			</Section>
		</Page>
	);
};

const Title = styled.h1`
	display: flex;
	flex-direction: column;
	text-align: center;
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

export default Index;
