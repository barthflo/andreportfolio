import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import TopBar from './TopBar';
import Footer from './Footer';
import styled from 'styled-components';
import useWindowScrollPosition from '../../../hooks/useWindowScrollPosition';

const PublicLayout = ({ children }) => {
	const { pathname } = useLocation();
	const scrollPosition = useWindowScrollPosition();
	const [showTopBar, setShowTopBar] = useState(false);

	useEffect(() => {
		if (scrollPosition < 450) {
			setShowTopBar(false);
		} else {
			setShowTopBar(true);
		}
	}, [scrollPosition]);

	return (
		<Wrapper>
			<TopBar showTopBar={pathname === '/' && !showTopBar ? false : true} />
			<Main margin={pathname !== '/'}>{children}</Main>
			<Footer />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	min-height: 100vh;
	width: 100vw;
`;
const Main = styled.main`
	margin-top: ${(props) => props.margin && '70px'};
`;

PublicLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default PublicLayout;
