import React, { useEffect, useState, useContext } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import useAppContext from '../../../../hooks/useAppContext';
import styled, { ThemeContext } from 'styled-components';
import useWindowDimensions from '../../../../hooks/useWindowDimensions';
import Menu from './MenuItems';
import SideBar from './SideBar';
import PropTypes from 'prop-types';

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

const TopBar = ({ showTopBar }) => {
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
		<Container showTopBar={showTopBar}>
			{!loading && (
				<>
					<Title
						to="/"
						onClick={() => {
							setOpen(false);
							window.scrollTo(0, 0);
						}}
						title="Return to top of home page"
					>
						{siteSettings.siteTitle.toUpperCase()}
					</Title>
					{width < Number(breakpoints.sm.replace('px', '')) ? (
						<>
							<BurgerContainer onClick={handleClick}>
								<Burger open={open} />
							</BurgerContainer>
							<Touch open={open} onClick={handleClick} />
							<SideBar
								menuItems={menuItems}
								open={open}
								onClick={handleClick}
							/>
						</>
					) : (
						<Menu items={menuItems} />
					)}
				</>
			)}
		</Container>
	);
};

const Container = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	background: ${(props) => props.theme.palette.background.surface.primary};
	box-shadow: ${(props) => props.theme.shadows.bottom};
	z-index: 1000;
	height: 70px;
	width: 100vw;
	padding: 20px;
	display: flex;
	visibility: ${(props) => (props.showTopBar ? 'visible' : 'collapse')}
	opacity: ${(props) => (props.showTopBar ? '1' : '0')}
	justify-content: space-between;
	align-items: center;
	transition: 0.2s ease-in-out;
	@media (min-width: ${(props) => props.theme.breakpoints.md}) {
		padding: 20px 105px;
	} ;
	@media (min-width: ${(props) => props.theme.breakpoints.lg}) {
		padding: 20px 210px;
	} ;
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
		height: 2px;
		transform: ${(props) => props.open && 'rotateZ(-90deg) translate(14px, 0)'};
		transition: .2s ease-in
	}
	&:after {
		height: 2px;
		top: 5px;
		display: ${(props) => props.open && 'none'};
	}
`;

const Touch = styled.div`
	display: ${(props) => (props.open ? 'block' : 'none')};
	position: fixed;
	top: 70px;
	left: 0;
	width: 100vw;
	height: calc(100vh - 70px);
`;

TopBar.propTypes = {
	showTopBar: PropTypes.bool.isRequired,
};
export default TopBar;
