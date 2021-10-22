import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import Button from '../../../components/Button';
import axios from 'axios';
import useAppContext from '../../../hooks/useAppContext';
import ProgressBar from '../../../components/ProgressBar';
import SnackBar from '../../../components/SnackBar';
import { useHistory } from 'react-router';

const CVForm = ({ cv }) => {
	const { actions, dispatch } = useAppContext();
	const [isDisabled, setDisabled] = useState(true);
	const [preview, setPreview] = useState(cv);
	const [progress, setProgress] = useState(0);
	const [notif, setNotif] = useState(null);
	const { goBack } = useHistory();

	const cvInput = useRef(null);

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
					cv: undefined,
					remove: undefined,
				}}
				validationSchema={Yup.object().shape({
					cv: Yup.mixed().test(
						'videoType',
						'Unsupported file format. Accepted format : .pdf',
						(value) =>
							!value ? true : ['application/pdf'].includes(value.type),
					),
				})}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					try {
						if (!values.cv) {
							resetForm();
							setSubmitting(false);
							return;
						}
						const formData = new FormData();

						Object.entries(values).forEach(([key, value]) => {
							if (key === 'cv') {
								key = 'files';
							}

							formData.append(key, value);
						});

						await axios.put('/api/medias/cv', formData, {
							headers: { 'Content-Type': 'multipart/form-data' },
							onUploadProgress: (e) => setProgress((e.loaded * 100) / e.total),
						});

						resetForm();
						cvInput.current.value = null;
						actions.getHomePageDatas(dispatch);
						setProgress(0);
						setSubmitting(false);
						setNotif({
							display: true,
							content: `CV successfully updated`,
							status: 'success',
						});
					} catch (err) {
						console.error(err);
						dispatch({
							type: 'ERROR',
							payload: err.response,
						});
					}
				}}
			>
				{({ errors, touched, handleSubmit, setFieldValue, isSubmitting }) => (
					<Form onSubmit={handleSubmit}>
						<InputGroup>
							<Label htmlFor="cv" hidden>
								CV
							</Label>

							<ImagePreview
								id="cvPreview"
								src={preview}
								alt="preview"
								type="application/pdf"
							/>
							<FileInput
								ref={cvInput}
								name="cv"
								id="cv"
								type="file"
								accept=".pdf"
								onChange={(e) => {
									if (e.currentTarget.files[0]) {
										setFieldValue('cv', e.currentTarget.files[0]);
										setFieldValue(
											'remove',
											cv.split('?')[0].split('/').slice(3).join('/'),
										);
										setPreview(URL.createObjectURL(e.currentTarget.files[0]));
									}
								}}
							/>
							<StyledFileInput
								as="span"
								hidden={isDisabled}
								onClick={() => cvInput.current.click()}
							>
								Chose a new CV
							</StyledFileInput>
							{errors.cv && touched.cv && <Error>{errors.cv}</Error>}
						</InputGroup>

						<ActionsContainer>
							<ButtonWrapper>
								<Button
									type="button"
									label="Previous"
									dark
									width="100%"
									onClick={() => goBack()}
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

const ImagePreview = styled.embed`
	width: 100%;
	height: 70vh;
	object-fit: cover;
	margin-bottom: 20px;
`;

CVForm.propTypes = {
	cv: PropTypes.string.isRequired,
};

export default CVForm;
