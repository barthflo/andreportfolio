import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { HashLink } from 'react-router-hash-link';
import useWindowDimensions from '../../../../hooks/useWindowDimensions';
import SideBar from '../SideBar';
import { IoLogOutOutline } from 'react-icons/io5';
import useAuth from '../../../../hooks/useAuth';

const TopBar = () => {
	const { width } = useWindowDimensions();
	const { breakpoints } = useContext(ThemeContext);
	const [open, setOpen] = useState(false);
	const { logout, dispatch } = useAuth();

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<Container>
			<Title to="/admin">Dashboard</Title>
			<Logout onClick={() => logout(dispatch)}>
				Logout
				<IoLogOutOutline size={'1.2em'} />
			</Logout>
			{width < Number(breakpoints.sm.replace('px', '')) && (
				<>
					<BurgerContainer onClick={handleClick}>
						<Burger open={open} />
					</BurgerContainer>
					<Touch open={open} onClick={handleClick} />
					<SideBar open={open} onClick={handleClick} />
				</>
			)}
		</Container>
	);
};

const Container = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	background: ${(props) => props.theme.palette.background.default};
	box-shadow: ${(props) => props.theme.shadows.bottom};
	z-index: 1000;
	height: 70px;
	width: 100vw;
	padding: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-transform: uppercase;
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		padding-left: 35px;
	}
`;

const Title = styled(HashLink)`
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

const Logout = styled.button`
	@media (max-width: ${(props) => props.theme.breakpoints.sm}) {
		display: none;
	}
	background: none;
	border: none;
	padding: 5px;
	color: ${(props) => props.theme.palette.text.secondary.light};
	text-transform: capitalize;
	display: flex;
	align-items: center;
	font-weight: 600;
	font-size: 18px;
	font-family: ${(props) => props.theme.typography.menu.items};
	cursor: pointer;
	& svg {
		margin-left: 5px;
	}
`;

const BurgerContainer = styled.button`
	border: none;
	background: none;
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
	right: 0;
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

export default TopBar;
