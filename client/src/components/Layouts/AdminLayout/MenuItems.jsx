import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import { HashLink } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import { RiMessage2Fill } from 'react-icons/ri';
import {
	IoHome,
	IoSettingsSharp,
	IoFilmSharp,
	IoLogOutOutline,
} from 'react-icons/io5';
import { HiEye } from 'react-icons/hi';
import { GiSkills } from 'react-icons/gi';
import { FaUserCog } from 'react-icons/fa';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import useAuth from '../../../hooks/useAuth';
import uuid from 'react-uuid';

const items = [
	{
		path: '/admin',
		label: 'Home',
		icon: <IoHome />,
	},
	{
		path: '/admin/settings',
		label: 'General Settings',
		icon: <IoSettingsSharp />,
	},
	{
		path: '/admin/profile',
		label: 'Profile',
		icon: <FaUserCog />,
	},
	{
		label: 'Filmography',
		icon: <IoFilmSharp />,
		subItems: [
			{
				path: '/admin/filmography',
				label: 'View all',
			},
			{
				path: '/admin/filmography/create',
				label: 'Add New',
			},
		],
	},
	{
		label: 'Skills',
		icon: <GiSkills />,
		subItems: [
			{
				path: '/admin/skills',
				label: 'View all',
			},
			{
				path: '/admin/skills/create',
				label: 'Add New',
			},
		],
	},
	{
		path: '/admin/messages',
		label: 'Messages',
		icon: <RiMessage2Fill />,
	},
	{
		path: '/',
		label: 'View Website',
		target: '_blank',
		icon: <HiEye />,
	},
];

const MenuItems = ({ onClick }) => {
	const { pathname } = useLocation();
	const { width } = useWindowDimensions();
	const { breakpoints } = useContext(ThemeContext);
	const { logout, dispatch } = useAuth();

	const renderActiveItem = (item, path) => {
		item.active = false;
		const element = document.getElementById(item.label.toLowerCase());
		if (element) {
			const { y, height } = element.getBoundingClientRect();
			if (y <= 70) {
				item.active = true;
			}
			if (y + height <= 70) {
				item.active = false;
			}

			return;
		}

		if (pathname === path) {
			item.active = true;
			return;
		}

		if (pathname.includes('filmography/edit')) {
			items
				.find((item) => item.label === 'Filmography')
				.subItems.find(
					(subitem) => subitem.path === '/admin/filmography',
				).active = true;
			return;
		}
		if (pathname.includes('skills/edit')) {
			items
				.find((item) => item.label === 'Skills')
				.subItems.find(
					(subitem) => subitem.path === '/admin/skills',
				).active = true;
			return;
		}
	};

	const renderItems = (items) => {
		return items.map((item) => {
			const { path, label, subItems, icon, target } = item;
			renderActiveItem(item, path);

			return (
				<Fragment key={uuid()}>
					{subItems ? (
						<SubContainer as="ul">
							<li style={{ display: 'flex', alignItems: 'center' }}>
								{icon}
								<Item>{label}</Item>
							</li>

							{renderItems(subItems)}
						</SubContainer>
					) : (
						<Container active={item.active}>
							{icon}
							<Item active={item.active} onClick={onClick}>
								<Link to={path} target={target || '_self'}>
									{label}
								</Link>
							</Item>
						</Container>
					)}
				</Fragment>
			);
		});
	};

	return (
		<List>
			{renderItems(items)}
			{width < Number(breakpoints.sm.replace('px', '')) && (
				<Container role="button" onClick={() => logout(dispatch)}>
					<IoLogOutOutline />
					<Item>Logout</Item>
				</Container>
			)}
		</List>
	);
};

const List = styled.ul`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: start;
	padding: 0 10px;
	margin: 50px 0;
`;

const Container = styled.li`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: start;
	margin-bottom: 16px;
	& > svg {
		margin-right: 5px;
		fill: ${(props) => props.active && props.theme.palette.action.active};
	}
	cursor: ${(props) => props.role === 'button' && 'pointer'};
`;

const SubContainer = styled(Container)`
	flex-direction: column;
	align-items: start;

	& li:first-child{
		margin-bottom: 8px;
		margin-left: 0;
		& span{
			font-size: 16px;
			font-style: normal;
			font-weight: 600;
			@media (min-width: ${(props) => props.theme.breakpoints.md}){
				font-size: 18px;
			}
		}
	}
	& li {
		margin-bottom: 0;
		margin-left: 20px;
		& span {
			font-size: 16px;
			font-style : italic;
			font-weight: 100;
		}
		& > svg {
			margin-right: 5px;
	}
`;
// const Star = styled(RiStarSFill)`
// 	color: ${(props) => props.theme.palette.action.active};
// 	font-size: 8px;
// `;

const Item = styled.span`
	text-transform: capitalize;
	color: ${(props) =>
		props.active
			? props.theme.palette.action.active
			: props.theme.palette.text.secondary.light};
	font-size: 16px;
	font-weight: 400;
	transition: 0.2s ease-in;
	@media (min-width: ${(props) => props.theme.breakpoints.md}) {
		font-size: 18px;
	}
`;

const Link = styled(HashLink)``;

MenuItems.propTypes = {
	onClick: PropTypes.func,
};

export default MenuItems;
