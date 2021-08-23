import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import useAppContext from '../../hooks/useAppContext';
import Page from '../../components/Page';
import Loading from '../../components/Loading';
import styled from 'styled-components';

const FilmographyListView = () => {
	window.scrollTo(0, 0);
	const { filmographyList, actions, dispatch, error } = useAppContext();
	const { push } = useHistory();

	useEffect(() => {
		if (!filmographyList) {
			actions.getMultipleFilmography(dispatch);
		}
	}, [filmographyList, actions, dispatch]);

	useEffect(() => {
		if (error) {
			console.log(error);
			push(`/${error.status}`);
		}
	}, [error, push]);

	return (
		<Page
			title="Andre Fonseca - Filmmaker - Filmography"
			description="List of all the movies and short films directed or written by Andre Fonseca"
		>
			{!filmographyList ? (
				<LoadingWrapper>
					<Loading />
				</LoadingWrapper>
			) : (
				<div>Filmo List</div>
			)}
		</Page>
	);
};

const LoadingWrapper = styled.div`
	z-index: -1;
`;

export default FilmographyListView;
