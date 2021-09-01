import React from 'react';
import styled from 'styled-components';
import MenuItems from '../MenuItems';
import PropTypes from 'prop-types';

const SideBar = ({ open, onClick }) => {
	return (
		<Container open={open}>
			<ImageContainer>
				<Image alt="animated clapper gif" />
			</ImageContainer>

			<MenuItems onClick={onClick} />
		</Container>
	);
};

const Container = styled.aside`
	background: ${(props) => props.theme.palette.background.overlay};
	font-family: ${(props) => props.theme.typography.menu.items};
	font-weight: 100;
	position: fixed;
	z-index: 500;
	padding: 24px 20px 48px;
	top: 70px;
	left: ${(props) => (props.open ? '0' : '-220px')};
	height: calc(100vh - 70px);
	width: 220px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	transition: 0.2s ease-in-out;
	overflow: auto;
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		width: 240px;
	}
`;

const ImageContainer = styled.i`
	display: flex;
	flex-direction: column;
	align-items: center;
	border-bottom: 1px solid
		${(props) => props.theme.palette.text.secondary.light};
`;

const Image = styled.img.attrs((props) => ({
	src: props.theme.animated.menu,
}))`
	width: 85px;
	height: 85px;
	margin-bottom: 36px;
`;

SideBar.propTypes = {
	open: PropTypes.bool.isRequired,
	onClick: PropTypes.func,
};

export default SideBar;
