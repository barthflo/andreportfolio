import React, { useRef, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import Button from '../../../components/Button';
import ReactPlayer from 'react-player';
import axios from 'axios';
import useAppContext from '../../../hooks/useAppContext';
import ProgressBar from '../../../components/ProgressBar';
import { TiDelete as DeleteIcon } from 'react-icons/ti';
import { useHistory } from 'react-router';

const FilmoForm = () => {
	const { actions, dispatch } = useAppContext();
	const [progress, setProgress] = useState(0);
	const { goBack, push } = useHistory();

	const [preview, setPreview] = useState({
		video: null,
		pictures: [],
	});

	const videoInput = useRef(null);
	const pictureInput = useRef(null);

	return (
		<>
			<ProgressBar progress={progress} />

			<Formik
				initialValues={{
					title: '',
					synopsis: '',
					date: '',
					role: '',
					production: '',
					distributor: '',
					pictures: [],
					video: undefined,
				}}
				validationSchema={Yup.object().shape({
					title: Yup.string().max(150).required('The title is required'),
					synopsis: Yup.string().required('The synopsis is required'),
					date: Yup.string().max(4).required('The date is required'),
					role: Yup.string().required('The role is required'),
					production: Yup.string().nullable(),
					distributor: Yup.string().nullable(),
					video: Yup.mixed()
						.test(
							'videoType',
							'Unsupported file format. Accepted format : .mp4',
							(value) => (!value ? true : ['video/mp4'].includes(value.type)),
						)
						.required('Video required'),
					pictures: Yup.array()
						.min(1, 'At least one picture is required')
						.of(
							Yup.mixed().test(
								'picType',
								'Unsupported file format. Accepted format : .jpg, .jpeg, .png',
								(value) =>
									!value
										? true
										: ['image/jpg', 'image/jpeg', 'image/png'].includes(
												value.type,
										  ),
							),
						),
				})}
				onSubmit={async (values, { setSubmitting, setFieldError }) => {
					try {
						if (!values.video) {
							setFieldError('video', 'The video is required');
							return;
						}
						const formData = new FormData();

						Object.entries(values).forEach(([key, value]) => {
							if (key === 'pictures') {
								value.map((file) => formData.append('files', file));
							} else {
								if (key === 'video') {
									key = 'files';
								}
								formData.append(key, value);
							}
						});

						const {
							data: { info },
						} = await axios.post('/api/filmography/', formData, {
							headers: { 'Content-Type': 'multipart/form-data' },
							onUploadProgress: (e) => setProgress((e.loaded * 100) / e.total),
						});

						actions.getMultipleFilmography(dispatch);
						actions.getHomePageDatas(dispatch);
						setProgress(0);
						setSubmitting(false);

						push({
							pathname: '/admin/filmography',
							state: {
								notif: {
									display: true,
									content: info,
									status: 'success',
								},
							},
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
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					setFieldValue,
					isSubmitting,
				}) => (
					<Form onSubmit={handleSubmit}>
						<InputGroup>
							<Label htmlFor="title">Title</Label>
							<Input
								type="text"
								name="title"
								id="title"
								value={values.title}
								onChange={handleChange}
								onBlur={handleBlur}
								error={Boolean(errors.title && touched.title)}
							/>
							{errors.title && touched.title && <Error>{errors.title}</Error>}
						</InputGroup>
						<InputGroup>
							<Label htmlFor="date">Released date</Label>
							<Input
								type="text"
								name="date"
								id="date"
								value={values.date}
								onChange={handleChange}
								onBlur={handleBlur}
								error={Boolean(errors.date && touched.date)}
							/>
							{errors.date && touched.date && <Error>{errors.date}</Error>}
						</InputGroup>
						<InputGroup>
							<Label htmlFor="role">Role/Position</Label>
							<Input
								type="text"
								name="role"
								id="role"
								value={values.role}
								onChange={handleChange}
								onBlur={handleBlur}
								error={Boolean(errors.role && touched.role)}
							/>
							{errors.role && touched.role && <Error>{errors.role}</Error>}
						</InputGroup>
						<InputGroup>
							<Label htmlFor="synopsis">Plot</Label>
							<Input
								as="textarea"
								rows="7"
								type="text"
								name="synopsis"
								id="synopsis"
								value={values.synopsis}
								onChange={handleChange}
								onBlur={handleBlur}
								error={Boolean(errors.synopsis && touched.synopsis)}
							/>
							{errors.synopsis && touched.synopsis && (
								<Error>{errors.synopsis}</Error>
							)}
						</InputGroup>
						<InputGroup>
							<Label htmlFor="production">Production (if any)</Label>
							<Input
								type="text"
								name="production"
								id="production"
								value={values.production || ''}
								onChange={handleChange}
								onBlur={handleBlur}
								error={Boolean(errors.production && touched.production)}
							/>
							{errors.production && touched.production && (
								<Error>{errors.production}</Error>
							)}
						</InputGroup>
						<InputGroup>
							<Label htmlFor="distributor">Distributor (if any)</Label>
							<Input
								type="text"
								name="distributor"
								id="distributor"
								value={values.distributor || ''}
								onChange={handleChange}
								onBlur={handleBlur}
								error={Boolean(errors.distributor && touched.distributor)}
							/>
							{errors.distributor && touched.distributor && (
								<Error>{errors.distributor}</Error>
							)}
						</InputGroup>
						<InputGroup>
							<Label htmlFor="video">Video reel</Label>
							<FileInput
								name="video"
								id="video"
								type="file"
								accept=".mp4, .avi"
								ref={videoInput}
								onChange={(e) => {
									if (e.currentTarget.files[0]) {
										setFieldValue('video', e.currentTarget.files[0]);
										setPreview({
											...preview,
											video: URL.createObjectURL(e.currentTarget.files[0]),
										});
									}
								}}
							/>
							<StyledFileInput
								as="span"
								onClick={() => videoInput.current.click()}
								error={Boolean(errors.video && touched.video)}
							>
								Chose a video
							</StyledFileInput>
							{preview.video && (
								<VideoPreview
									id="videoPreview"
									url={preview.video}
									playsinline
									controls
									playing
									loop
									muted
									config={{
										file: {
											attributes: {
												controlsList: 'nodownload',
											},
										},
									}}
									onError={(e) => console.log(e)}
								/>
							)}
							{errors.video && touched.video && <Error>{errors.video}</Error>}
						</InputGroup>

						<InputGroup>
							<Label htmlFor="pictures">
								Pictures (A minimum of 6 pictures is advised for the display)
							</Label>
							<FileInput
								name="pictures"
								id="pictures"
								type="file"
								multiple
								accept=".jpeg, .jpg, .png"
								ref={pictureInput}
								onChange={(e) => {
									if (e.currentTarget.files[0]) {
										setFieldValue('pictures', [
											...values.pictures,
											...Array.from(e.currentTarget.files),
										]);
										const previews = Array.from(e.currentTarget.files).map(
											(file) => URL.createObjectURL(file),
										);
										setPreview({
											...preview,
											pictures: [...preview.pictures, ...previews],
										});
									}
								}}
							/>
							<StyledFileInput
								as="span"
								onClick={() => pictureInput.current.click()}
								error={Boolean(errors.pictures && touched.pictures)}
							>
								Add pictures
							</StyledFileInput>
							<ImageContainer>
								{preview.pictures.map((url, index) => (
									<ImagePreviewContainer key={index}>
										<RemoveButton
											title="Remove the picture"
											onClick={() => {
												setPreview({
													...preview,
													pictures: preview.pictures.filter(
														(pic) => pic !== url,
													),
												});
											}}
										>
											<DeleteIcon />
										</RemoveButton>
										<ImagePreview src={url} alt="preview" />
									</ImagePreviewContainer>
								))}
							</ImageContainer>

							{errors.pictures && touched.pictures && (
								<Error>{errors.pictures}</Error>
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
									type="submit"
									label="Save"
									variant="primary"
									width="100%"
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
	display: block;
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

const VideoPreview = styled(ReactPlayer)`
	width: 100% !important;
	height: 100% !important;
	margin-bottom: 18px;
	& > video {
		height: 100%;
		width: 100%;
	}
`;

const ImageContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const ImagePreviewContainer = styled.div`
	position: relative;
	width: 150px;
	height: 150px;
	flex-grow: 1;
`;

const RemoveButton = styled.span`
	position: absolute;
	top: 0;
	right: 0;
	height: 35px;
	width: 35px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	& > svg {
		fill: ${(props) => props.theme.palette.action.active};
		width: 80%;
		height: 80%;
	}
`;

const ImagePreview = styled.img`
	width: 100%;
	height: 100%;
	padding: 2px;
	object-fit: cover;
`;

export default FilmoForm;
