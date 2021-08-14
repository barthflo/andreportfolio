import React from 'react';
import PropTypes from 'prop-types';
import { HashLink as Link } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { RiStarSFill } from 'react-icons/ri';

const MenuItems = ({ items }) => {
	const { pathname, hash } = useLocation();
	const currentRoute = pathname + hash;

	return (
		<List>
			{items.map((item, index) => {
				const { path, label } = item;
				item.active = false;
				if (currentRoute === path) {
					item.active = true;
				}
				if (
					currentRoute.includes('/filmography') &&
					path.includes('filmography')
				) {
					item.active = true;
				}
				return (
					<Container key={index}>
						{item.active && <Star />}
						<Item active={item.active}>
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
	&:hover {
		color: ${(props) => !props.active && props.theme.palette.action.hover};
		transition: 0.2s ease-in;
	}
`;

MenuItems.propTypes = {
	items: PropTypes.array.isRequired,
};

export default MenuItems;
