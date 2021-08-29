import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';
import { Redirect, useHistory } from 'react-router-dom';

const AuthGuard = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const [redirect, setRedirect] = useState(false);
	const {
		location: { pathname },
	} = useHistory();

	useEffect(() => {
		if (!isAuthenticated) {
			setRedirect(true);
		}
	}, [isAuthenticated]);

	if (redirect) {
		return <Redirect to={{ pathname: '/login', state: { from: pathname } }} />;
	}
	return <>{children}</>;
};

AuthGuard.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthGuard;
