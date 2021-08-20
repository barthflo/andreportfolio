import React from 'react';
import PropTypes from 'prop-types';

const AuthGuard = ({ children }) => {
	return (
		<>
			Auth necessary
			<br />
			{children}
		</>
	);
};

AuthGuard.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthGuard;
