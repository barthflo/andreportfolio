import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
	const {
		state: { user, isAuthenticated, error },
		dispatch,
		actions: { login, logout },
	} = useContext(AuthContext);
	return {
		user,
		isAuthenticated,
		error,
		dispatch,
		login,
		logout,
	};
};

export default useAuth;
