import React, { useState } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import Button from '../../../components/Button';
import axios from 'axios';
import useAppContext from '../../../hooks/useAppContext';
import ProgressBar from '../../../components/ProgressBar';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

const SkillsForm = ({ categories, id, skill, categoryId }) => {
	const { actions, dispatch } = useAppContext();
	const [progress, setProgress] = useState(0);
	const [isDisabled, setDisabled] = useState(true);
	const { push } = useHistory();

	return (
		<>
			<ProgressBar progress={progress} />

			<Formik
				initialValues={{
					category: categoryId,
					newCategory: '',
					description: skill.name,
				}}
				validationSchema={Yup.object().shape({
					category: Yup.string().test(
						'has-value',
						'The category is required',
						(value) =>
							value === 'New' || (value && value.length) ? true : false,
					),
					newCategory: Yup.string().when('category', {
						is: (value) => value === 'New' && true,
						then: Yup.string()
							.max(150)
							.required('Add a new category or chose an existing one'),
					}),
					description: Yup.string()
						.max(250)
						.required('The skill description is required'),
				})}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					try {
						if (!values.newCategory.length) {
							delete values.newCategory;
						}

						const {
							data: { info },
						} = await axios.put('/api/skills/' + id, values, {
							headers: { 'Content-Type': 'application/json' },
							onUploadProgress: (e) => setProgress((e.loaded * 100) / e.total),
						});

						console.log(info);
						actions.getHomePageDatas(dispatch);
						setProgress(0);
						setSubmitting(false);
						resetForm();
						push({
							pathname: '/admin/skills',
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
							<Label htmlFor="category">Category</Label>
							<Input
								as="select"
								type="text"
								name="category"
								id="category"
								value={values.category}
								onChange={(e) => {
									if (values.newCategory.length) {
										setFieldValue('newCategory', '');
									}
									setFieldValue('category', e.target.value);
								}}
								onBlur={handleBlur}
								error={Boolean(errors.category && touched.category)}
								capitalize
								disabled={isDisabled}
							>
								{categories.map((category) => (
									<Option key={category.id} value={category.id}>
										{category.name}
									</Option>
								))}
								<Option value="New">new category</Option>
							</Input>
							{errors.category && touched.category && (
								<Error>{errors.category}</Error>
							)}
						</InputGroup>
						{values.category === 'New' && (
							<InputGroup>
								<Label htmlFor="newCategory">Add a category</Label>
								<Input
									type="text"
									name="newCategory"
									id="newCategory"
									value={values.newCategory}
									onChange={handleChange}
									onBlur={handleBlur}
									error={Boolean(errors.newCategory && touched.newCategory)}
									disabled={isDisabled}
								/>
								{errors.newCategory && touched.newCategory && (
									<Error>{errors.newCategory}</Error>
								)}
							</InputGroup>
						)}
						<InputGroup>
							<Label htmlFor="role">Description</Label>
							<Input
								as="textarea"
								rows={5}
								type="text"
								name="description"
								id="description"
								value={values.description}
								onChange={handleChange}
								onBlur={handleBlur}
								error={Boolean(errors.description && touched.description)}
								disabled={isDisabled}
							/>
							{errors.description && touched.description && (
								<Error>{errors.description}</Error>
							)}
						</InputGroup>

						<ActionsContainer>
							<ButtonWrapper>
								<Button
									type="button"
									label="Previous"
									dark
									width="100%"
									onClick={() => push('/admin/skills')}
									disabled={isSubmitting}
								/>
							</ButtonWrapper>
							<ButtonWrapper>
								<Button
									type={isDisabled ? 'submit' : 'button'}
									label={isDisabled ? 'Edit' : 'Save'}
									onClick={() => setDisabled(!isDisabled)}
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

const Input = styled(Field)`
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
	text-transform: ${(props) => props.capitalize && 'capitalize'}
	&:focus-visible {
		outline: 1px solid ${(props) => props.theme.palette.text.secondary.light};
	}
	-webkit-appearance: none;
`;

const Option = styled.option``;

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

SkillsForm.propTypes = {
	categories: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
	id: PropTypes.number.isRequired,
	skill: PropTypes.object.isRequired,
	category_id: PropTypes.number.isRequired,
};

export default SkillsForm;
