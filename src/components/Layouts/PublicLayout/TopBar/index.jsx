import React, { useEffect, useState, useContext } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import useAppContext from '../../../../hooks/useAppContext';
import styled, { ThemeContext } from 'styled-components';
import useWindowDimensions from '../../../../hooks/useWindowDimensions';
import Menu from './MenuItems';
import SideBar from './SideBar';

const menuItems = [
	{
		path: '/#about',
		label: 'About',
	},
	{
		path: '/#filmography',
		label: 'Filmography',
	},
	{
		path: '/#skills',
		label: 'Skills',
	},
	{
		path: '/#contact',
		label: 'Contact',
	},
];

const TopBar = () => {
	const { siteSettings } = useAppContext();
	const [loading, setLoading] = useState(true);
	const { width } = useWindowDimensions();
	const { breakpoints } = useContext(ThemeContext);
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	useEffect(() => {
		if (siteSettings) {
			setLoading(false);
		}
	}, [siteSettings]);

	return (
		<Container>
			{!loading && (
				<>
					<Title to="/">{siteSettings.siteTitle.toUpperCase()}</Title>
					{width < Number(breakpoints.sm.replace('px', '')) ? (
						<>
							<BurgerContainer onClick={handleClick}>
								<Burger open={open} />
							</BurgerContainer>
							<SideBar menuItems={menuItems} open={open} />
						</>
					) : (
						<Menu items={menuItems} />
					)}
				</>
			)}
		</Container>
	);
};

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	background: ${(props) => props.theme.palette.background.surface.primary};
	box-shadow: ${(props) => props.theme.shadows};
	border-bottom: 1px solid ${(props) => props.theme.palette.border};
	z-index: 1000;
	height: 70px;
	width: 100vw;
	padding: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Title = styled(Link)`
	font-family: ${(props) => props.theme.typography.menu.title};
	color: ${(props) => props.theme.palette.text.secondary.light};
	font-size: 20px;
	max-width: 150px;
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		max-width: unset;
		flex-grow: 1;
		font-size: 28px;
	}
`;

const BurgerContainer = styled.div`
	position: relative;
	width: 25px;
	height: 20px;
	cursor: pointer;
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		display: none;
	}
`;
const Burger = styled.span`
	position: absolute;
	top: 0;
	width: 25px;
	height: 2px;
	background: ${(props) => props.theme.palette.text.secondary.light};
	transform: ${(props) => props.open && 'rotateZ(-45deg) translate(-6px ,4px)'};
	transition: .2s ease-in
	&:before,
	&:after {
		content: '';
		width: 25px;
		background: ${(props) => props.theme.palette.text.secondary.light};
		display: block;
		position: relative;
	}
	&:before {
		top: 15px;
		height: ${(props) => (props.open ? '2px' : '3px')};
		transform: ${(props) => props.open && 'rotateZ(-90deg) translate(14px, 0)'};
		transition: .2s ease-in
	}
	&:after {
		height: 2px;
		top: 5px;
		display: ${(props) => props.open && 'none'};
	}
`;

export default TopBar;
