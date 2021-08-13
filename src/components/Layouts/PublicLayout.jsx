import React from 'react';
import PropTypes from 'prop-types';

const PublicLayout = ({ children }) => {
	return <div>{children}</div>;
};

PublicLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default PublicLayout;
