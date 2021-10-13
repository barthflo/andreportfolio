import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import Button from '../../../components/Button';
import ReactPlayer from 'react-player';
import axios from 'axios';
import useAppContext from '../../../hooks/useAppContext';
import ProgressBar from '../../../components/ProgressBar';
import SnackBar from '../../../components/SnackBar';
import { useHistory } from 'react-router';

const SiteSettingsForm = ({ siteSettings, video: { video, picture, id } }) => {
	const { siteTitle, siteSubtitle } = siteSettings;
	const { actions, dispatch } = useAppContext();
	const [isDisabled, setDisabled] = useState(true);
	const [preview, setPreview] = useState({
		video: video,
		picture: picture,
	});
	const [progress, setProgress] = useState(0);
	const [notif, setNotif] = useState(null);
	const { goBack } = useHistory();

	const videoInput = useRef(null);
	const pictureInput = useRef(null);

	const resetFileInputs = () => {
		videoInput.current.value = null;
		pictureInput.current.value = null;
		return;
	};

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
					siteTitle: siteTitle,
					siteSubtitle: siteSubtitle,
					remove: [],
				}}
				validationSchema={Yup.object().shape({
					siteTitle: Yup.string().max(150).required('The title is required'),
					siteSubtitle: Yup.string()
						.max(150)
						.required('The headline is required'),
					video: Yup.mixed().test(
						'videoType',
						'Unsupported file format. Accepted format : .mp4',
						(value) => (!value ? true : ['video/mp4'].includes(value.type)),
					),
					picture: Yup.mixed().test(
						'picType',
						'Unsupported file format. Accepted format : .jpg, .jpeg, .png',
						(value) =>
							!value
								? true
								: ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type),
					),
				})}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					try {
						const formData = new FormData();

						if (!values.remove.length) delete values.remove;

						Object.entries(values).forEach(([key, value]) => {
							if (key === 'video' || key === 'picture') {
								key = 'files';
							}

							formData.append(key, value);
						});

						const {
							data: { title, subtitle },
						} = await axios.put(
							'/api/settings/' + siteTitle + '?id=' + id,
							formData,
							{
								headers: { 'Content-Type': 'multipart/form-data' },
								onUploadProgress: (e) =>
									setProgress((e.loaded * 100) / e.total),
							},
						);
						resetForm({
							values: {
								siteTitle: title,
								siteSubtitle: subtitle,
								remove: [],
							},
						});
						resetFileInputs();

						actions.getHomePageDatas(dispatch);
						actions.initialize(dispatch);
						setProgress(0);
						setSubmitting(false);
						setNotif({
							display: true,
							content: `Site settings successfully updated`,
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
							<Label htmlFor="siteTitle">Site title</Label>
							<Input
								type="text"
								name="siteTitle"
								id="siteTitle"
								value={values.siteTitle}
								onChange={handleChange}
								onBlur={handleBlur}
								error={Boolean(errors.siteTitle && touched.siteTitle)}
								disabled={isDisabled}
							/>
							{errors.siteTitle && touched.siteTitle && (
								<Error>{errors.siteTitle}</Error>
							)}
						</InputGroup>
						<InputGroup>
							<Label htmlFor="siteSubtitle">Site headline</Label>
							<Input
								type="text"
								name="siteSubtitle"
								id="siteSubtitle"
								value={values.siteSubtitle}
								onChange={handleChange}
								onBlur={handleBlur}
								error={Boolean(errors.siteSubtitle && touched.siteSubtitle)}
								disabled={isDisabled}
							/>
							{errors.siteSubtitle && touched.siteSubtitle && (
								<Error>{errors.siteSubtitle}</Error>
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
										setFieldValue('remove', [
											...values.remove,
											video.split('?')[0].split('/').slice(3).join('/'),
										]);
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
								// light={preview.picture}
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
							<Label htmlFor="picture">
								Picture (this is displayed in case the video can't start)
							</Label>
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
											...values.remove,
											picture.split('?')[0].split('/').slice(3).join('/'),
										]);
										setPreview({
											...preview,
											picture: URL.createObjectURL(e.currentTarget.files[0]),
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

const VideoPreview = styled(ReactPlayer)`
	width: 100% !important;
	height: 100% !important;
	margin-bottom: 18px;
	& > video {
		height: 100%;
		width: 100%;
	}
`;

const ImagePreview = styled.img`
	width: 100%;
	height: 100%;
	max-height: 250px;
	object-fit: cover;
`;

SiteSettingsForm.propTypes = {
	siteSettings: PropTypes.object.isRequired,
};

export default SiteSettingsForm;
