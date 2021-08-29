import React from 'react';
import PropTypes from 'prop-types';
import TopBar from './TopBar';
import SideBar from './SideBar';
import styled from 'styled-components';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

const AdminLayout = ({ children }) => {
	const { width } = useWindowDimensions();
	return (
		<Wrapper>
			<TopBar />
			<SideBar open={width > 768 && true} />
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
	margin-top: 70px;
	width: 100vw;
	min-height: calc(100vh - 70px);
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		width: calc(100vw - 220px);
		margin-left: 220px;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.md}) {
		width: calc(100vw - 280px);
		margin-left: 280px;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.lg}) {
		width: calc(100vw - 300px);
		margin-left: 300px;
	}
`;

AdminLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AdminLayout;
