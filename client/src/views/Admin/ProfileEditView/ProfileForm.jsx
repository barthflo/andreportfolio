import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import Button from '../../../components/Button';
import axios from 'axios';
import ProgressBar from '../../../components/ProgressBar';
import SnackBar from '../../../components/SnackBar';
import { useHistory } from 'react-router';

const ProfileForm = ({ user: { fullname, email, phone, about }, dispatch }) => {
	const [isDisabled, setDisabled] = useState(true);
	const [progress, setProgress] = useState(0);
	const [notif, setNotif] = useState(null);
	const { goBack, push } = useHistory();
	const [preview, setPreview] = useState({
		picture: about ? about.profilePic : null,
	});
	const pictureInput = useRef(null);

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
					bio: about ? about.content : undefined,
					currentPassword: '',
					newPassword: '',
					remove: [],
					isOwner: about ? true : false,
				}}
				validationSchema={Yup.object().shape({
					isOwner: Yup.boolean(),
					fullname: Yup.string().max(250).required('The name is required'),
					email: Yup.string()
						.email('The email address must be a valid format')
						.max(250)
						.required('The email address is required'),
					phone: Yup.string().max(25).required('The phone number is required'),
					bio: Yup.string().when('isOwner', {
						is: true,
						then: Yup.string().required('A biography is required'),
						otherwise: Yup.string(),
					}),
					currentPassword: Yup.string(),
					newPassword: Yup.mixed().when('currentPassword', {
						is: (value) => value !== undefined,
						then: Yup.string()
							.min(6, 'Your new password must be at least 6 characters')
							.required('You need to enter a new password'),
					}),
					picture: Yup.mixed().test(
						'picType',
						'Unsupported file format. Accepted format : .jpg, .jpeg, .png',
						(value) =>
							!value
								? true
								: ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type),
					),
				})}
				onSubmit={async (
					values,
					{ setSubmitting, setFieldError, resetForm },
				) => {
					try {
						const userValues = {
							fullname: values.fullname,
							email: values.email,
							phone: values.phone,
						};

						if (values.currentPassword.length !== 0) {
							userValues.password = {
								current: values.currentPassword,
								update: values.newPassword,
							};
						}

						const { data: user } = await axios.put(
							'/api/auth/account',
							userValues,
							{
								headers: { 'Content-Type': 'application/json' },
								onUploadProgress: (e) =>
									setProgress((e.loaded * 100) / e.total),
							},
						);

						if (values.isOwner) {
							const aboutValues = new FormData();

							aboutValues.append('content', values.bio);
							if (values.picture) {
								aboutValues.append('files', values.picture);
								aboutValues.append('remove', values.remove);
							}
							const { data } = await axios.put(
								`/api/about/${about.id}`,
								aboutValues,
								{
									headers: {
										'Content-Type': 'multipart/form-data',
									},
								},
							);
							user.about = data.about;
						}

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
								currentPassword: '',
								newPassword: '',
								bio: user.about ? user.about.content : undefined,
								isOwner: user.about ? true : false,
							},
						});
					} catch (err) {
						console.error(err.response);
						if (err.response.status === 401) {
							setFieldError('currentPassword', err.response.data.passwordError);
							setDisabled(false);
							dispatch({
								type: 'ERROR',
								payload: err.response,
							});
							return;
						}

						push(`/${err.response.status}`);
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
					setFieldValue,
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
						{about && (
							<>
								<InputGroup>
									<Label htmlFor="bio">Biography</Label>
									<Input
										as="textarea"
										rows="7"
										type="text"
										name="bio"
										id="bio"
										value={values.bio}
										onChange={handleChange}
										onBlur={handleBlur}
										error={Boolean(errors.bio && touched.bio)}
										disabled={isDisabled}
									/>
									{errors.bio && touched.bio && <Error>{errors.bio}</Error>}
								</InputGroup>
								<InputGroup>
									<Label htmlFor="picture">Profile Picture</Label>
									<FileInput
										name="picture"
										id="picture"
										type="file"
										accept=".jpeg, .jpg, .png"
										ref={pictureInput}
										onChange={(e) => {
											if (e.currentTarget.files[0]) {
												setFieldValue('picture', e.currentTarget.files[0]);
												setFieldValue('remove', [
													about.profilePic
														.split('?')[0]
														.split('/')
														.slice(3)
														.join('/'),
												]);
												setPreview({
													picture: URL.createObjectURL(
														e.currentTarget.files[0],
													),
												});
											}
										}}
									/>
									<StyledFileInput
										as="span"
										hidden={isDisabled}
										onClick={() => pictureInput.current.click()}
									>
										Chose a new picture
									</StyledFileInput>
									<ImagePreview
										id="videoPreview"
										src={preview.picture}
										alt="preview"
									/>
									{errors.picture && touched.picture && (
										<Error>{errors.picture}</Error>
									)}
								</InputGroup>
							</>
						)}
						<Heading as="h2">Change your password </Heading>
						<InputGroup>
							<Label htmlFor="currentPassword">Current</Label>
							<Input
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
						<ActionsContainer>
							<ButtonWrapper>
								<Button
									type="button"
									label="Previous"
									dark
									width="100%"
									onClick={() => goBack()}
									disabled={isSubmitting}
								/>
							</ButtonWrapper>
							<ButtonWrapper>
								<Button
									type={isDisabled ? 'submit' : 'button'}
									label={isDisabled ? 'Edit' : 'Save'}
									variant="primary"
									width="100%"
									onClick={() => setDisabled(!isDisabled)}
									disabled={isSubmitting || Object.keys(errors).length}
									title={
										Object.keys(errors).length > 0
											? 'One or more fields are invalid. Check the details you entered in the form'
											: undefined
									}
								/>
							</ButtonWrapper>
						</ActionsContainer>
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

const FileInput = styled.input`
	display: none;
`;

const StyledFileInput = styled(Input)`
	cursor: pointer;
	display: ${(props) => (props.hidden ? 'none' : 'block')};
`;

const ImagePreview = styled.img`
	width: 100%;
	height: 300px;
	object-fit: cover;
	align-self: start;
`;

const Error = styled.span`
	color: red;
	position: absolute;
	bottom: 0;
	left: 0;
	font-size: 12px;
	text-transform: capitalize;
`;

const ActionsContainer = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	justify-content: flex-end;
`;

const ButtonWrapper = styled.span`
	display: flex;
	flex-grow: 1;
	padding: 5px;
`;

const Heading = styled.h2`
	font-size: 1.3em;
	margin: 20px 0;
`;

ProfileForm.propTypes = {
	user: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
};

export default ProfileForm;
