import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TopBar from './TopBar';
import SideBar from './SideBar';
import styled from 'styled-components';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

const AdminLayout = ({ children }) => {
	const { width } = useWindowDimensions();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [children]);

	return (
		<Wrapper>
			<TopBar />
			<SideBar open={width >= 768 && true} />
			<Main>{children}</Main>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	min-height: 100vh;
	width: 100vw;
	color: ${(props) => props.theme.palette.text.secondary.light};
`;

const Main = styled.main`
	padding-top: 70px;
	width: 100vw;
	min-height: calc(100vh - 70px);
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		width: calc(100vw - 240px);
		margin-left: 240px;
	}
`;

AdminLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AdminLayout;
