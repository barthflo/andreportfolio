import React from 'react';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';
import { Redirect } from 'react-router-dom';

const AuthGuard = ({ children }) => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) return <Redirect to="/login" />;

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
