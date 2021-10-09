import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import Button from '../../../components/Button';
import axios from 'axios';
import ProgressBar from '../../../components/ProgressBar';
import SnackBar from '../../../components/SnackBar';

const ProfileForm = ({ user: { fullname, email, phone }, dispatch }) => {
	const [isDisabled, setDisabled] = useState(true);

	const [progress, setProgress] = useState(0);
	const [notif, setNotif] = useState(null);
	const currentPasswordRef = useRef(null);
	const newPasswordRef = useRef(null);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setNotif(null);
		}, 5000);

		return () => clearTimeout(timeout);
	}, [notif]);

	return (
		<>
			<ProgressBar progress={progress} />
			{notif && (
				<SnackBar
					show={notif.display}
					content={notif.content}
					status={notif.status}
				/>
			)}
			<Formik
				initialValues={{
					fullname: fullname,
					email: email,
					phone: phone,
					currentPassword: null,
					newPassword: null,
				}}
				validationSchema={Yup.object().shape({
					fullname: Yup.string().max(250).required('The name is required'),
					email: Yup.string()
						.email('The email address must be a valid format')
						.max(250)
						.required('The email address is required'),
					phone: Yup.string().max(25).required('The phone number is required'),
					currentPassword: Yup.string().nullable(),
					newPassword: Yup.string().when('currentPassword', (value) =>
						value === null
							? Yup.string().nullable()
							: Yup.string()
									.nullable()
									.min(6, 'Your new password must be at least 6 characters')
									.required('You need to enter a new password'),
					),
				})}
				onSubmit={async (
					values,
					{ setSubmitting, setFieldError, resetForm },
				) => {
					try {
						if (values.currentPassword) {
							values.password = {
								current: values.currentPassword,
								update: values.newPassword,
							};
						}
						const { data: user } = await axios.put('/api/auth/user', values, {
							headers: { 'Content-Type': 'application/json' },
							onUploadProgress: (e) => setProgress((e.loaded * 100) / e.total),
						});
						dispatch({
							type: 'UPDATE',
							payload: { user },
						});
						localStorage.setItem('user', JSON.stringify(user));

						setProgress(0);
						setSubmitting(false);
						setNotif({
							display: true,
							content: `User settings successfully updated`,
							status: 'success',
						});
						resetForm({
							values: {
								fullname: user.fullname,
								email: user.email,
								phone: user.phone,
								currentPassword: null,
								newPassword: null,
							},
						});
						currentPasswordRef.current.value = null;
						newPasswordRef.current.value = null;
						delete values.password;
					} catch (err) {
						console.error(err);
						if (err.response.status === 401) {
							setFieldError('currentPassword', err.response.data.passwordError);
							setDisabled(false);
						}
						dispatch({
							type: 'ERROR',
							payload: err.response,
						});
					}
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<Form onSubmit={handleSubmit}>
						<Heading as="h2">Your details</Heading>
						<InputGroup>
							<Label htmlFor="fullname">Full Name</Label>
							<Input
								type="text"
								name="fullname"
								id="fullname"
								value={values.fullname}
								onChange={handleChange}
								onBlur={handleBlur}
								error={Boolean(errors.fullname && touched.fullname)}
								disabled={isDisabled}
							/>
							{errors.fullname && touched.fullname && (
								<Error>{errors.fullname}</Error>
							)}
						</InputGroup>
						<InputGroup>
							<Label htmlFor="email">Email Address</Label>
							<Input
								type="email"
								name="email"
								id="email"
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
								error={Boolean(errors.email && touched.email)}
								disabled={isDisabled}
							/>
							{errors.email && touched.email && <Error>{errors.email}</Error>}
						</InputGroup>
						<InputGroup>
							<Label htmlFor="phone">Telephone Number</Label>
							<Input
								type="text"
								name="phone"
								id="phone"
								value={values.phone}
								onChange={handleChange}
								onBlur={handleBlur}
								error={Boolean(errors.phone && touched.phone)}
								disabled={isDisabled}
							/>
							{errors.phone && touched.phone && <Error>{errors.phone}</Error>}
						</InputGroup>
						<Heading as="h2">Change your password </Heading>
						<InputGroup>
							<Label htmlFor="currentPassword">Current</Label>
							<Input
								ref={currentPasswordRef}
								type="password"
								name="currentPassword"
								id="currentPassword"
								value={values.currentPassword}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="Enter your current password"
								error={Boolean(
									errors.currentPassword && touched.currentPassword,
								)}
								disabled={isDisabled}
							/>
							{errors.currentPassword && touched.currentPassword && (
								<Error>{errors.currentPassword}</Error>
							)}
						</InputGroup>
						<InputGroup>
							<Label htmlFor="newPassword">New</Label>
							<Input
								ref={newPasswordRef}
								type="password"
								name="newPassword"
								id="newPassword"
								value={values.newPassword}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder={'Enter a new password'}
								error={Boolean(errors.newPassword && touched.newPassword)}
								disabled={isDisabled || values.currentPassword === null}
							/>
							{errors.newPassword && touched.newPassword && (
								<Error>{errors.newPassword}</Error>
							)}
						</InputGroup>

						<ButtonWrapper>
							<Button
								type={isDisabled ? 'submit' : 'button'}
								label={isDisabled ? 'Edit' : 'Save'}
								variant="primary"
								width="100%"
								onClick={() => setDisabled(!isDisabled)}
								disabled={isSubmitting}
							/>
						</ButtonWrapper>
					</Form>
				)}
			</Formik>
		</>
	);
};

const Form = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	max-width: 700px;
`;

const InputGroup = styled.div`
	margin-bottom: 10px;
	display: flex;
	flex-direction: column;
	position: relative;
`;

const Label = styled.label`
	margin-bottom: 8px;
	font-size: 18px;
	text-transform: capitalize;
`;

const Input = styled.input`
	font-size: 16px;
	width: 100%;
	font-family: ${(props) => props.theme.typography.main};
	background: ${(props) => props.theme.palette.background.default};
	border: 1px solid
		${(props) => (props.error ? 'red' : props.theme.palette.background.surface)};
	padding: 8px 20px;
	margin-bottom: 18px;
	color: ${(props) => props.theme.palette.text.secondary.light};
	font-style: italic;
	&:focus-visible {
		outline: 1px solid ${(props) => props.theme.palette.text.secondary.light};
	}
`;

const Error = styled.span`
	color: red;
	position: absolute;
	bottom: 0;
	left: 0;
	font-size: 12px;
	text-transform: capitalize;
`;

const ButtonWrapper = styled.div`
	width: 100%;
	align-self: flex-end;
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		width: unset;
	}
`;

const Heading = styled.h2`
	font-size: 1.3em;
	margin-bottom: 20px;
`;

ProfileForm.propTypes = {
	user: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
};

export default ProfileForm;
