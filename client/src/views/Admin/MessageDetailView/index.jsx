import React, { useEffect, useCallback } from 'react';
import useAppContext from '../../../hooks/useAppContext';
import Page from '../../../components/Page';
import Section from '../../../components/Section';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import moment from 'moment';
import axios from 'axios';
moment.locale('en');

const MessagesDetailView = () => {
	const { siteSettings, actions, dispatch } = useAppContext();
	const {
		location: { state },
		goBack,
	} = useHistory();

	console.log(state);

	const updateStatus = useCallback(async () => {
		try {
			const {
				data: { updatedMessage },
			} = await axios.put(`/api/messages/${state.id}`, { read: true });
			console.log(updatedMessage);
			actions.getMessages(dispatch, '?');
		} catch (err) {
			console.error(err.response);
			dispatch({
				type: 'ERROR',
				payoad: err.response,
			});
		}
	}, [state, actions, dispatch]);

	useEffect(() => {
		if (state.read === 0) {
			updateStatus();
		}
	}, [state, updateStatus]);

	return (
		<Page
			title={`Dashboard - Messages - ${
				siteSettings
					? siteSettings.siteTitle + ' - ' + siteSettings.siteSubtitle
					: 'Loading'
			}`}
			description={`Administration dashboard message detail page `}
		>
			<Section admin>
				<Wrapper>
					<Header>
						<h1>Your messages received</h1>
					</Header>

					<Container>
						<Card alignItems="start">
							<Headings as="h2">
								You got a new message from {state.from}
							</Headings>
							<span>
								On the {moment(state.date).utc().utcOffset(9).format('L')}
							</span>
						</Card>
						<Card alignItems="start">
							<Box>
								<Headings as="h3">Object :</Headings>
								<p>{state.object}</p>
							</Box>
							<Box>
								<Headings as="h3">Content :</Headings>
								<p>{state.message}</p>
							</Box>
							<ActionsContainer>
								<ButtonWrapper>
									<Button
										label="Previous"
										dark
										width="100%"
										onClick={() => goBack()}
									/>
								</ButtonWrapper>
								<ButtonWrapper>
									<Button
										as="a"
										target={`mailto:${state.email}?subject=RE:${state.object}&body=${state.from} wrote : \n\n ${state.message}`}
										label={'Reply'}
										variant="primary"
										width="100%"
									/>
								</ButtonWrapper>
							</ActionsContainer>
						</Card>
					</Container>
				</Wrapper>
			</Section>
			{/* )} */}
		</Page>
	);
};

const Wrapper = styled.div`
	padding: 1vh 0;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: 300;
	& h1 {
		font-weight: 600;
		text-transform: capitalize;
		font-size: 2em;
		align-self: start;
		margin-bottom: 20px;
	}
`;

const Header = styled.header`
	width: 100%;
	display: flex;
	align-self: start;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	margin-bottom: 10px;
	& h1 {
		margin-bottom: 0;
		flex-grow: 1;
	}
`;

const Container = styled.div`
	margin-top: 10px;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: ${(props) => props.justifyContent || 'space-between'};
`;

const Headings = styled.h2`
	margin-bottom: 8px;
`;

const Box = styled.div`
	margin-bottom: 20px;
	background: ${(props) => props.theme.palette.background.default};
	width: 100%;
	box-shadow: ${(props) => props.theme.shadows.bottom};
	padding: 10px;
	border: 1px solid gray;
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

export default MessagesDetailView;
