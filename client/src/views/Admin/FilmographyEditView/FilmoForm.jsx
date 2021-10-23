import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
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

const FilmoForm = ({
	film: { date, distributor, id, production, role, synopsis, title, urls },
}) => {
	const { actions, dispatch } = useAppContext();
	const [isDisabled, setDisabled] = useState(true);
	const [progress, setProgress] = useState(0);
	const { goBack, push } = useHistory();

	const getVideoUrl = () => {
		const videoUrl = urls.filter((url) => url.includes('video'));
		return videoUrl[0];
	};
	const getPicturesUrls = () => {
		const picturesUrls = urls.filter((url) => url.includes('images'));
		return picturesUrls;
	};
	const [preview, setPreview] = useState({
		video: getVideoUrl(),
		pictures: getPicturesUrls(),
	});

	const videoInput = useRef(null);
	const pictureInput = useRef(null);

	return (
		<>
			<ProgressBar progress={progress} />
			<Formik
				initialValues={{
					title: title,
					synopsis: synopsis,
					date: date,
					role: role,
					production: production,
					distributor: distributor,
					pictures: [],
					remove: [],
				}}
				validationSchema={Yup.object().shape({
					title: Yup.string().max(150).required('The title is required'),
					synopsis: Yup.string().required('The synopsis is required'),
					date: Yup.string().max(4).required('The date is required'),
					role: Yup.string().required('The role is required'),
					production: Yup.string().nullable(),
					distributor: Yup.string().nullable(),
					video: Yup.mixed().test(
						'videoType',
						'Unsupported file format. Accepted format : .mp4',
						(value) => (!value ? true : ['video/mp4'].includes(value.type)),
					),
					pictures: Yup.array().of(
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
						if (!preview.pictures.length && !values.pictures.length) {
							setFieldError('pictures', 'At least one picture is required');
							return;
						}
						const formData = new FormData();

						if (!values.remove.length) delete values.remove;
						if (!values.pictures.length) delete values.pictures;

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

						await axios.put('/api/filmography/' + id, formData, {
							headers: { 'Content-Type': 'multipart/form-data' },
							onUploadProgress: (e) => setProgress((e.loaded * 100) / e.total),
						});

						actions.getHomePageDatas(dispatch);
						actions.getMultipleFilmography(dispatch);
						setProgress(0);
						setSubmitting(false);
						push({
							pathname: '/admin/filmography',
							state: {
								notif: {
									display: true,
									content: `Film details successfully updated`,
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
								disabled={isDisabled}
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
								disabled={isDisabled}
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
								disabled={isDisabled}
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
								disabled={isDisabled}
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
								disabled={isDisabled}
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
								disabled={isDisabled}
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
										if (preview.video && preview.video.includes('amazonaws')) {
											setFieldValue('remove', [
												...values.remove,
												preview.video
													.split('?')[0]
													.split('/')
													.slice(3)
													.join('/'),
											]);
										}

										setPreview({
											...preview,
											video: URL.createObjectURL(e.currentTarget.files[0]),
										});
									}
								}}
							/>
							<StyledFileInput
								as="span"
								hidden={isDisabled}
								onClick={() => videoInput.current.click()}
							>
								Chose a new video
							</StyledFileInput>
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
								hidden={isDisabled && !errors.pictures}
								onClick={() => pictureInput.current.click()}
							>
								Add new pictures
							</StyledFileInput>
							<ImageContainer>
								{preview.pictures.map((url, index) => (
									<ImagePreviewContainer key={index}>
										<RemoveButton
											title="Remove the picture"
											onClick={() => {
												if (url.includes('amazonaws')) {
													setFieldValue('remove', [
														...values.remove,
														url.split('?')[0].split('/').slice(3).join('/'),
													]);
												}
												setPreview({
													...preview,
													pictures: preview.pictures.filter(
														(pic) => pic !== url,
													),
												});
											}}
											disabled={isDisabled}
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
	display: ${(props) => (props.disabled ? 'none' : 'flex')};
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

FilmoForm.propTypes = {
	date: PropTypes.string.isRequired,
	distributor: PropTypes.string,
	id: PropTypes.number.isRequired,
	production: PropTypes.string,
	role: PropTypes.string.isRequired,
	synopsis: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	urls: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

FilmoForm.defaultProps = {
	date: '',
	id: 1,
	role: '',
	synopsis: '',
	title: '',
	urls: [],
};

export default FilmoForm;
