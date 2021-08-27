import React, { useState } from 'react';
import Page from '../../components/Page';
import useAuth from '../../hooks/useAuth';
import { Redirect } from 'react-router-dom';

const LoginView = () => {
	const { login, dispatch, isAuthenticated } = useAuth();

	const [inputValues, setInputValues] = useState({
		email: '',
		password: '',
	});

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

	if (isAuthenticated) {
		return <Redirect to="/admin" />;
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
