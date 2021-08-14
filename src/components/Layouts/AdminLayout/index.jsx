import React from 'react';
import PropTypes from 'prop-types';

const AdminLayout = ({ children }) => {
	return <div>{children}</div>;
};

AdminLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AdminLayout;
