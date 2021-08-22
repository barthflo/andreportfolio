import React from 'react';
import styled from 'styled-components';
import Menu from './MenuItems';
import PropTypes from 'prop-types';
import { RiStarSFill } from 'react-icons/ri';

const SideBar = ({ menuItems, open, onClick }) => {
	return (
		<Container open={open}>
			<ImageContainer>
				<Image alt="animated clapper gif" />
				<StarsContainer>
					<Star />
					<Star />
					<Star />
				</StarsContainer>
			</ImageContainer>

			<Menu items={menuItems} onClick={onClick} />
			<StarsContainer>
				<Star />
				<Star />
				<Star />
			</StarsContainer>
		</Container>
	);
};

const Container = styled.aside`
	background: ${(props) => props.theme.palette.background.overlay};
	position: fixed;
	z-index: 500;
	top: 70px;
	right: ${(props) => (props.open ? '0' : '-220px')};
	height: calc(100vh - 70px);
	width: 220px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	padding-top: 48px;
	transition: 0.2s ease-in-out;
	overflow: auto;
`;

const ImageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 48px;
`;

const StarsContainer = styled.div`
	display: flex;
	width: 45px;
	justify-content: space-between;
`;

const Star = styled(RiStarSFill)`
	color: ${(props) => props.theme.palette.text.secondary.light};
	font-size: 10px;
`;

const Image = styled.img.attrs((props) => ({
	src: props.theme.animated.menu,
}))`
	width: 85px;
	height: 85px;
	margin-bottom: 36px;
`;

SideBar.propTypes = {
	menuItems: PropTypes.array.isRequired,
	open: PropTypes.bool.isRequired,
};

export default SideBar;
