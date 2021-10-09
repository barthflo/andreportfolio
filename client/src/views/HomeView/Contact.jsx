import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import useAppContext from '../../hooks/useAppContext';
import SnackBar from '../../components/SnackBar';

const Contact = () => {
	const { dispatch } = useAppContext();
	const [notif, setNotif] = useState(null);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setNotif(false);
		}, 5000);

		return () => clearTimeout(timeout);
	}, [notif]);

	return (
		<Wrapper>
			<h2>Contact Me</h2>
			{notif && notif.display && (
				<SnackBar show={true} content={notif.content} status={notif.status} />
			)}
			<Formik
				initialValues={{
					from: '',
					email: '',
					object: '',
					message: '',
				}}
				validationSchema={Yup.object().shape({
					from: Yup.string().max(150).required('full name required'),
					email: Yup.string().email().max(150).required('email required'),
					object: Yup.string().max(250).required('object required'),
					message: Yup.string().required('message cannot be empty'),
				})}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					try {
						await axios.post('/api/messages', values);
						setSubmitting(false);
						setNotif({
							display: true,
							content: `Thank you ${values.from}! I'll get back in touch with you shortly.`,
							status: 'default',
						});
						resetForm();
					} catch (err) {
						console.log(err);
						dispatch({ type: 'ERROR', payload: err.response });
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
						<InputGroup>
							<FormControl>
								<Label htmlFor="from">Full Name</Label>
								<Input
									type="text"
									id="from"
									placeholder="Type your name"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.from}
									error={Boolean(errors.from && touched.from)}
								/>
								{errors.from && touched.from && <Error>{errors.from}</Error>}
							</FormControl>
							<FormControl>
								<Label htmlFor="email">Email</Label>
								<Input
									type="email"
									id="email"
									placeholder="Type your email adress"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
									error={Boolean(errors.email && touched.email)}
								/>
								{errors.email && touched.email && <Error>{errors.email}</Error>}
							</FormControl>
							<FormControl>
								<Label htmlFor="object">Object</Label>
								<Input
									type="text"
									id="object"
									placeholder="Type the object of your message"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.object}
									error={Boolean(errors.object && touched.object)}
								/>
								{errors.object && touched.object && (
									<Error>{errors.object}</Error>
								)}
							</FormControl>
							<FormControl noHeight>
								<Label htmlFor="message">Message</Label>
								<Input
									as="textarea"
									rows="14"
									id="message"
									placeholder="Type your message"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.message}
									error={Boolean(errors.message && touched.message)}
								/>
								{errors.message && touched.message && (
									<Error bottom>{errors.message}</Error>
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
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 9vh 0 5vh;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: 300;
	& h2 {
		font-weight: 600;
		margin-bottom: 25px;
		text-transform: capitalize;
		font-size: 36px;
		@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
			font-size: 48px;
		}
		@media (min-width: ${(props) => props.theme.breakpoints.md}) {
			font-size: 56px;
		}
	}
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	font-style: italic;
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		width: 570px;
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
	font-size: 16px;
	margin-bottom: 5px;
`;

const Input = styled.input`
	font-size: 16px;
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

const Error = styled.span`
	color: red;
	position: absolute;
	bottom: ${(props) => (props.bottom ? 0 : '5px')};
	left: 20px;
	font-size: 12px;
	text-transform: capitalize;
`;

export default Contact;
