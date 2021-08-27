import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/Button';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const LoginForm = () => {
	const { login, dispatch } = useAuth();
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			validationSchema={Yup.object().shape({
				email: Yup.string().email().max(50).required('email required'),
				password: Yup.string().max(50).required('password required'),
			})}
			onSubmit={async (values, { setSubmitting, setFieldError }) => {
				const res = await login(dispatch, values);
				const { error } = res;
				if (error) {
					if (error.email) {
						setFieldError('email', error.email);
					}
					if (error.password) {
						setFieldError('password', error.password);
					}
				}
				setSubmitting(false);
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
					<InputGroup>
						<FormControl>
							<Label htmlFor="email">Email</Label>
							<Input
								type="email"
								id="email"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								error={Boolean(errors.email && touched.email)}
							/>
							{errors.email && touched.email && <Error>{errors.email}</Error>}
						</FormControl>
						<FormControl>
							<Label htmlFor="password">Password</Label>
							<Wrapper>
								<Input
									type={showPassword ? 'text' : 'password'}
									id="password"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
									error={Boolean(errors.password && touched.password)}
								/>
								<Toggle
									role="button"
									onClick={() => setShowPassword(!showPassword)}
									show={Boolean(values.password.length)}
								>
									{showPassword ? (
										<FiEyeOff size={'1.2em'} />
									) : (
										<FiEye size={'1.2em'} />
									)}
								</Toggle>
							</Wrapper>

							{errors.password && touched.password && (
								<Error>{errors.password}</Error>
							)}
						</FormControl>
					</InputGroup>
					<Button
						type="submit"
						variant="primary"
						label="Send"
						disabled={
							isSubmitting || Object.values(values).some((val) => val === '')
						}
						width="100%"
					/>
				</Form>
			)}
		</Formik>
	);
};

const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 90%;
	font-style: italic;
	@media (min-width: ${(props) => props.theme.breakpoints.md}) {
		max-width: 570px;
	}
`;

const InputGroup = styled.div`
	margin-bottom: 10px;
`;
const FormControl = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	width: inherit;
	height: ${(props) => !props.noHeight && '80px'};
`;

const Label = styled.label`
	font-size: 14px;
	margin-bottom: 5px;
`;

const Input = styled.input`
	font-size: 16px;
	width: 100%;
	font-family: ${(props) => props.theme.typography.main};
	background: ${(props) => props.theme.palette.background.surface.primary};
	border: 1px solid
		${(props) => (props.error ? 'red' : props.theme.palette.border)};
	padding: 8px 20px;
	margin-bottom: 14px;
	color: ${(props) => props.theme.palette.text.secondary.light};
	font-style: italic;
	&:focus-visible {
		outline: 1px solid ${(props) => props.theme.palette.text.secondary.light};
	}
`;

const Wrapper = styled.div`
	position: relative;
`;

const Toggle = styled.span`
	position: absolute;
	top: 0;
	right: 10px;
	height: 37px;
	display: ${(props) => (props.show ? 'flex' : 'none')};
	align-items: center;
	cursor: pointer;
	& > svg {
		stroke: ${(props) => props.theme.palette.text.secondary.light};
	}
`;

const Error = styled.span`
	color: red;
	position: absolute;
	bottom: ${(props) => (props.bottom ? 0 : '5px')};
	left: 0;
	font-size: 12px;
	text-transform: capitalize;
`;

export default LoginForm;
