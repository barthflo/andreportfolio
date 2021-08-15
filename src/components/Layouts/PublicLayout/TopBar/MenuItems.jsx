import React from 'react';
import PropTypes from 'prop-types';
import { HashLink as Link } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { RiStarSFill } from 'react-icons/ri';

const MenuItems = ({ items, onClick }) => {
	const { pathname, hash } = useLocation();
	const currentRoute = pathname + hash;

	const renderActiveItem = (item, path) => {
		item.active = false;
		const element = document.getElementById(item.label.toLowerCase());

		if (element) {
			const { y, height } = element.getBoundingClientRect();
			if (y <= 0) {
				item.active = true;
			}
			if (y + height <= 0) {
				item.active = false;
			}
			return;
		}

		if (currentRoute === path) {
			item.active = true;
			return;
		}

		if (currentRoute.includes('/filmography') && path.includes('filmography')) {
			item.active = true;
			return;
		}
	};

	return (
		<List>
			{items.map((item, index) => {
				const { path, label } = item;
				renderActiveItem(item, path);

				return (
					<Container key={index}>
						{item.active && <Star />}
						<Item active={item.active} onClick={onClick}>
							<Link to={path}>{label}</Link>
						</Item>
						{item.active && <Star />}
					</Container>
				);
			})}
		</List>
	);
};

const List = styled.ul`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: center;
	margin-bottom: 48px;
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		flex-direction: row;
		display: inline-flex;
		display: inline-flex;
		justify-content: space-between;
		flex-grow: 1;
		max-width: 500px;
		margin-bottom: unset;
	}
`;

const Container = styled.li`
	display: inline-flex;
	align-items: center;
	margin-bottom: 16px;
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		margin-bottom: 0;
	}
`;

const Star = styled(RiStarSFill)`
	color: ${(props) => props.theme.palette.action.active};
	font-size: 8px;
`;

const Item = styled.span`
	font-family: ${(props) => props.theme.typography.menu.items};
	color: ${(props) =>
		props.active
			? props.theme.palette.action.active
			: props.theme.palette.text.secondary.light};
	font-size: 20px;
	font-weight: 400;
	margin: 0 5px;
	transition: 0.2s ease-in;

	&:hover {
		color: ${(props) => !props.active && props.theme.palette.action.hover};
		transition: 0.2s ease-in;
	}
`;

MenuItems.propTypes = {
	items: PropTypes.array.isRequired,
	onClick: PropTypes.func,
};

export default MenuItems;
