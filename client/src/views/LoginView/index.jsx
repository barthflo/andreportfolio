import React, { useState } from 'react';
import Page from '../../components/Page';
import useAuth from '../../hooks/useAuth';
import { Redirect, useHistory } from 'react-router-dom';

const LoginView = () => {
	const { login, dispatch, isAuthenticated, error } = useAuth();

	const [inputValues, setInputValues] = useState({
		email: '',
		password: '',
	});

	const {
		location: { state },
	} = useHistory();
	const handleChange = (e) => {
		setInputValues({
			...inputValues,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		await login(dispatch, inputValues);
	};

	if (error && error.status === 500) {
		return <Redirect to="/500" />;
	}
	if (isAuthenticated) {
		return <Redirect to={state.from} />;
	}

	return (
		<Page title="Andre Fonseca - Filmmaker - Login" description="Login page">
			<h1>Login page</h1>
			<form onSubmit={onSubmit}>
				<input type="email" id="email" name="email" onChange={handleChange} />
				<input
					type="password"
					id="password"
					name="password"
					onChange={handleChange}
				/>
				<button type="submit">Submit</button>
			</form>
		</Page>
	);
};

export default LoginView;
