import React from 'react';
import PropTypes from 'prop-types';
import { RiMessage2Fill } from 'react-icons/ri';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Card from '../../../components/Card';

const Messages = ({ messagesCount }) => {
	return (
		<Card flexDirection="row">
			<Link to="/admin/messages" title="Link to messages">
				You have <Strong>{messagesCount + ' '}</Strong>
				unread message{messagesCount > 1 && 's'}!
			</Link>

			<RiMessage2Fill style={{ marginLeft: 10 }} />
		</Card>
	);
};

const Strong = styled.span`
	color: ${(props) => props.theme.palette.text.primary};
	font-weight: 600;
`;

Messages.propTypes = {
	messagesCount: PropTypes.number.isRequired,
};

export default Messages;
