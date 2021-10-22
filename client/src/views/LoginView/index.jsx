import React from 'react';
import Page from '../../components/Page';
import useAuth from '../../hooks/useAuth';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Form from './Form';
import useAppContext from '../../hooks/useAppContext';

const LoginView = () => {
	const { isAuthenticated, error } = useAuth();
	const { siteSettings } = useAppContext();
	const {
		location: { state },
	} = useHistory();

	if (error && error.status === 500) {
		return <Redirect to="/500" />;
	}
	if (isAuthenticated) {
		return <Redirect to={state && state.from ? state.from : '/admin'} />;
	}

	return (
		<Page
			title={`${
				siteSettings
					? siteSettings.siteTitle + ' - ' + siteSettings.siteSubtitle
					: 'Loading'
			} - Login`}
			description="Login page"
		>
			<Wrapper>
				<Container light>
					<Logo src={`${process.env.PUBLIC_URL}/android-chrome-192x192.png`} />
					<Title>Login</Title>
				</Container>
				<Container>
					<Form />
				</Container>
			</Wrapper>
		</Page>
	);
};

const Wrapper = styled.section`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: ${(props) => props.theme.palette.background.gradient};
	font-family: ${(props) => props.theme.typography.main};
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		flex-direction: row;
	}
`;

const Container = styled.div`
	width: inherit;
	height: 50vh;
	background: ${(props) => props.light && props.theme.palette.background.paper};
	color: ${(props) => props.light && props.theme.palette.text.secondary.dark};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		width: 50%;
		height: inherit;
	}
`;

const Logo = styled.img`
	width: 45px;
	height: 45px;
	object-fit: cover;
`;

const Title = styled.h1`
	font-family: ${(props) => props.theme.typography.menu.title};
	font-weight: 600;
	padding: 20px 0 10px;
	text-transform: uppercase;
	border-bottom: 2px solid ${(props) => props.theme.palette.border};
`;
export default LoginView;
