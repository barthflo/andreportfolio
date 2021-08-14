import React from 'react';
import PropTypes from 'prop-types';
import TopBar from './TopBar';
import Footer from './Footer';
import styled from 'styled-components';

const PublicLayout = ({ children }) => {
	return (
		<>
			<TopBar />
			<Main>{children}</Main>
			<Footer />
		</>
	);
};

const Main = styled.main`
	margin-top: 70px;
`;

PublicLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default PublicLayout;
