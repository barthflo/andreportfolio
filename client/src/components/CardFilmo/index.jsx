import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { HashLink as Link } from 'react-router-hash-link';
import { useLocation } from 'react-router';
import StyledButton from '../../components/Button/';
import Overlay from '../Overlay';
import useAppContext from '../../hooks/useAppContext';
import axios from 'axios';

const CardFilmo = ({ film, heading }) => {
	const [overflow, setOverflow] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const { urls, title, date, synopsis, id } = film;
	const { pathname } = useLocation();
	const { actions, dispatch } = useAppContext();

	// eslint-disable-next-line array-callback-return
	const picture = urls.filter((url) => {
		const extension = url.split('.').pop().split('?').shift();
		if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
			return url;
		}
	})[0];

	const deleteFilm = async () => {
		try {
			const {
				data: { info },
			} = await axios.delete('/api/filmography/' + id, {
				headers: {
					'Content-Type': 'application/json',
				},
				data: urls.map((url) =>
					url.split('?')[0].split('/').slice(3).join('/'),
				),
			});
			actions.getMultipleFilmography(dispatch);
			setConfirmDelete(false);
			console.log(info);
		} catch (err) {
			console.error(err);
			dispatch({
				type: 'ERROR',
				payload: err.response,
			});
		}
	};

	return (
		<>
			{confirmDelete && (
				<Overlay
					title="Are you sure you want to delete this item?"
					description={`This action will permanently erase all the datas for this movie. \n\n Press confirm to continue or cancel to come back.`}
					actionLabel="Confirm"
					validate={deleteFilm}
					close={() => setConfirmDelete(false)}
				/>
			)}
			<Container>
				<Link
					to={
						pathname.includes('admin')
							? `/admin/filmography/edit/${film.title.toLowerCase()}`
							: `/filmography/${film.title.toLowerCase()}`
					}
				>
					<ImageContainer>
						<Image
							src={picture}
							alt={`Picture frame from the movie ${title}`}
						/>
					</ImageContainer>
				</Link>
				<CardInfosContainer $overflow={Boolean(overflow)}>
					<Link
						to={
							pathname.includes('admin')
								? `/admin/filmography/edit/${film.title.toLowerCase()}`
								: `/filmography/${film.title.toLowerCase()}`
						}
					>
						<Title as={heading}>
							{title} ({date})
						</Title>
					</Link>
					<Description margin={pathname.includes('admin')}>
						{overflow ? synopsis : synopsis.slice(0, 150) + '...'}
					</Description>
					{pathname.includes('admin') ? (
						<ActionsContainer>
							<ButtonWrapper>
								<ButtonLink
									to={`/admin/filmography/edit/${film.title.toLowerCase()}`}
								>
									Edit Content{' '}
								</ButtonLink>
							</ButtonWrapper>
							<ButtonWrapper shrink>
								<StyledButton
									type="button"
									label="Delete Film"
									minWidth="fit-content"
									// dark
									variant="warning"
									// width="100%"
									onClick={setConfirmDelete}
								/>
							</ButtonWrapper>
						</ActionsContainer>
					) : (
						<Button onClick={() => setOverflow(!overflow)}>
							{overflow ? 'collapse' : 'read more'}
						</Button>
					)}
				</CardInfosContainer>
			</Container>
		</>
	);
};

const Container = styled.article`
	width: 100%;
	margin-bottom: 20px;
	@media (min-width: ${(props) => props.theme.breakpoints.xs}) {
		padding: 0 5px;
	}
`;

const ImageContainer = styled.figure`
	width: 100%;
	height: 300px;
	margin-bottom: 7px;
	box-shadow: ${(props) => props.theme.shadows.bottom};
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const CardInfosContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: ${(props) => (props.$overflow ? 'start' : 'space-around')};
	overflow: ${(props) => props.$overflow && 'scroll'};
	padding: 20px;
	align-items: center;
	background: ${(props) => props.theme.palette.background.surface.primary};
	color: ${(props) => props.theme.palette.text.secondary.light};
	height: 175px;
	box-shadow: ${(props) => props.theme.shadows.bottom};
`;

const Title = styled.div`
	font-weight: 600;
	font-size: 20px;
	margin-bottom: 16px;
	text-align: center;
	text-transform: capitalize;
	transition: 0.2s ease-in;
	&:hover {
		color: ${(props) => props.theme.palette.action.hover};
		transition: 0.2s ease-in;
	}
`;

const Description = styled.p`
	font-weight: 300;
	font-size: 14px !important;
	text-align: justify;
	margin-bottom: ${(props) => (props.margin ? '10px' : 'unset')};
`;

const Button = styled.button`
	background: none;
	border: none;
	color: ${(props) => props.theme.palette.text.secondary.light}
	font-size: 12px;
	font-style: italic;
	align-self: flex-end;
	margin-top: 10px;
	cursor: pointer;
	transition: 0.2s ease-in;
	&:hover {
		color: ${(props) => props.theme.palette.action.hover};
		transition: 0.2s ease-in;
	}
`;

const ActionsContainer = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	justify-content: flex-end;
`;

const ButtonWrapper = styled.span`
	display: flex;
	flex-grow: ${(props) => (props.shrink ? '0' : '1')};
	padding: 5px;
	margin-top: 10px;
`;

const ButtonLink = styled(Link)`
	min-width: 100%;
	padding: 7px;
	color: ${(props) => props.theme.palette.text.secondary.dark};
	background: ${(props) => props.theme.palette.background.surface.secondary};
	border: 1px solid ${(props) => props.theme.palette.border};
	box-shadow: ${(props) => props.theme.shadows.bottom};
	text-align: center;
	text-transform: capitalize;
`;

CardFilmo.propTypes = {
	film: PropTypes.object.isRequired,
	heading: PropTypes.string.isRequired,
};

export default CardFilmo;
