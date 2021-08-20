import React, { useState, useEffect } from 'react';
import useAppContext from '../../../../hooks/useAppContext';
import styled from 'styled-components';
import { RiStarSFill } from 'react-icons/ri';

const Footer = () => {
	const { siteSettings } = useAppContext();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (siteSettings) {
			setLoading(false);
		}
	}, [siteSettings]);

	return (
		<>
			{!loading && (
				<Container>
					<Copyright>{siteSettings.userName + ' © 2021'}</Copyright>
					<Star />
					<Link href={`mailto:${siteSettings.userEmail}`} title="send an email">
						{siteSettings.userEmail}
					</Link>
					<Link href={`tel:${siteSettings.userPhone}`} title="make a call">
						{siteSettings.userPhone}
					</Link>
				</Container>
			)}
		</>
	);
};

const Container = styled.footer`
	background: ${(props) => props.theme.palette.background.default};
	color: ${(props) => props.theme.palette.text.secondary.light};
	font-family: ${(props) => props.theme.typography.main};
	font-weight: 300;
	font-size: 14px;
	height: 130px;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-shadow: ${(props) => props.theme.shadows.top};
`;

const Copyright = styled.span`
	font-style: italic;
	margin-bottom: 6px;
`;

const Star = styled(RiStarSFill)`
	color: ${(props) => props.theme.palette.text.secondary.light};
	font-size: 15px;
	margin-bottom: 6px;
`;

const Link = styled.a`
	transition: 0.2s ease-in;
	margin-bottom: 6px;
	&:hover {
		color: ${(props) => props.theme.palette.action.hover};
		transition: 0.2s ease-in;
	}
`;

export default Footer;
