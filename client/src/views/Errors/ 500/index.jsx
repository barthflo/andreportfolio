import React from 'react';
import Page from '../../../components/Page';
import Section from '../../../components/Section';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/Button';

const Index = () => {
	const { goBack } = useHistory();
	return (
		<Page
			title="500 - Error Server"
			description="An error occured with the server"
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
					<span>500</span>
					Ooops, an error occured on the server.
				</Title>
				<AnimatedGif src={`${process.env.PUBLIC_URL}/directorchair.gif`} />
				<Subtitle>
					It seems the connection got lost. Please try again later.
				</Subtitle>
				<ButtonWrapper>
					<Button
						variant="primary"
						onClick={() => goBack()}
						label="Reload"
						width="100%"
					/>
				</ButtonWrapper>
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

const ButtonWrapper = styled.div`
	width: 100%;
	margin-top: 20px;
	@media (min-width: ${(props) => props.theme.breakpoints.xs}) {
		width: fit-content;
	}
`;
// const Button = styled.button`
// 	margin-top: 30px;
// 	min-width: 100%;
// 	padding: 7px;
// 	color: ${(props) => props.theme.palette.text.secondary.dark};
// 	background: ${(props) => props.theme.palette.background.surface.secondary};
// 	border: 1px solid ${(props) => props.theme.palette.border};
// 	box-shadow: ${(props) => props.theme.shadows.bottom};
// 	text-align: center;
// 	text-transform: capitalize;
// 	@media (min-width: ${(props) => props.theme.breakpoints.xs}) {
// 		min-width: 230px;
// `;

export default Index;
