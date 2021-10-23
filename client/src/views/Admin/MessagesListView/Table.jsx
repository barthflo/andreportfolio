import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import useAppContext from '../../../hooks/useAppContext';
import axios from 'axios';
moment.locale('en');

const TableMail = ({ messageList }) => {
	const { dispatch, actions } = useAppContext();
	const { push } = useHistory();
	const [filtered, setFiltered] = useState(false);
	const [messages, setMessages] = useState(messageList);
	const filterReadMessages = () => {
		const readMessages = messages.filter((message) => message.read === 0);
		setMessages(readMessages);
	};

	const updateMessages = async () => {
		try {
			const {
				data: { updatedMessages },
			} = await axios.put(`/api/messages`, { read: true });
			setMessages(updatedMessages);
			actions.getMessages(dispatch, '?');
		} catch (err) {
			console.error(err.response);
			dispatch({
				type: 'ERROR',
				payload: err.response,
			});
		}
	};

	const renderTable = (messages) => {
		return (
			<Table>
				<TableHead>
					<Row padding="15px">
						<Cell as="th" minWidth="70px">
							Sender
						</Cell>
						<Cell as="th" grow margin="0 10px">
							Message
						</Cell>
						<Cell as="th" minWidth="100px" textAlign="right">
							Received
						</Cell>
					</Row>
				</TableHead>
				<TableBody>
					{messages.map((message) => (
						<Row
							key={message.id}
							read={Boolean(message.read)}
							padding="5px 15px 5px 5px"
							onClick={() => {
								// if (message.read === 0) {
								// 	message.read = 1;
								// }
								push({
									pathname: '/admin/messages/' + message.id,
									state: message,
								});
							}}
							cursor
						>
							<Cell>
								<Status read={Boolean(message.read)}></Status>
							</Cell>
							<Cell grow minWidth="70px">
								{message.from}
							</Cell>
							<Cell
								// grow
								margin="0 10px"
								display="flex"
								flexDirection="column"
								// width="100%"
							>
								<span style={{ fontWeight: 'bold' }}>{message.object}</span>
								<span>
									{message.message.length > 150
										? message.message.slice(0, 150) + ' ...'
										: message.message}
								</span>
							</Cell>
							<Cell minWidth="100px" textAlign="right">
								{moment(message.date).utc().utcOffset(9).fromNow()}
							</Cell>
						</Row>
					))}
				</TableBody>
				<TableFoot>
					<Row padding=" 5px 15px" fontSize="14px" italic justify="end">
						<Cell
							hover
							cursor
							onClick={() => {
								if (filtered) {
									setMessages(messageList);
								} else {
									filterReadMessages();
								}
								setFiltered(!filtered);
							}}
						>
							{filtered ? 'Show All' : 'Show Unread'}
						</Cell>
						<Cell margin=" 0 20px">/</Cell>
						<Cell hover cursor onClick={() => updateMessages()}>
							Mark all as read
						</Cell>
					</Row>
				</TableFoot>
			</Table>
		);
	};
	return renderTable(messages);
};

const Table = styled.table`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding: 5px;
`;

const TableHead = styled.thead`
	width: inherit;
	background: ${(props) => props.theme.palette.background.default};
	box-shadow: ${(props) => props.theme.shadows.bottom};
	border-bottom: 1px solid gray;
`;

const TableFoot = styled(TableHead)`
	border-bottom: none;
`;

const TableBody = styled.tbody`
	height: 60vh;
	overflow: scroll;
	background: ${(props) => props.theme.palette.background.default};
	display: block;
	width: 100%;
	border: 1px solid ${(props) => props.theme.palette.border};
`;

const Row = styled.tr`
	display: flex;
	justify-content: ${(props) =>
		props.justify ? props.justify : 'space-between'};
	border-bottom: 1px solid gray;
	padding: ${(props) => props.padding};
	background: ${(props) => (props.read ? 'unset' : '#2e2f3199')};
	&:last-child {
		border-bottom: none;
	}
	cursor: ${(props) => props.cursor && 'pointer'};
	box-shadow: ${(props) => props.theme.shadows.bottom};
	font-size: ${(props) => props.fontSize && props.fontSize};
	font-style: ${(props) => props.italic && 'italic'};
`;

const Cell = styled.td`
	position: relative;
	text-align: ${(props) => props.textAlign || 'start'};
	word-break: break-word;
	flex-grow: ${(props) => (props.grow ? '1' : '0')};
	margin: ${(props) => props.margin && props.margin};
	width: ${(props) => props.width && props.width};
	display: ${(props) => props.display && props.display};
	flex-direction: ${(props) => props.flexDirection && props.flexDirection};
	min-width: ${(props) => props.minWidth && props.minWidth};
	cursor: ${(props) => props.cursor && 'pointer'};
	&:hover {
		color: ${(props) => props.hover && props.theme.palette.action.hover};
		transition: 0.2s ease-in-out;
	}
`;

const Status = styled.span`
	width: 6px;
	height: 6px;
	border-radius: 100px;
	background: ${(props) => props.theme.palette.background.surface.secondary};
	display: block;
	visibility: ${(props) => (props.read ? 'hidden' : 'visible')};
	margin-right: 5px;
`;

TableMail.propTypes = {
	messageList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableMail;
