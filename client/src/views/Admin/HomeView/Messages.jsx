import React from 'react';
import PropTypes from 'prop-types';
import { RiMessage2Fill } from 'react-icons/ri';
import styled from 'styled-components';
import { HashLink } from 'react-router-hash-link';
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

// const Card = styled.div`
// 	width: 100%;
// 	padding: 20px;
// 	background: ${(props) => props.theme.palette.background.surface.primary};
// 	box-shadow: ${(props) => props.theme.shadows.bottom};
// 	margin-bottom: 20px;
// 	display: flex;
// 	justify-content: center;
// `;

const Link = styled(HashLink)``;

const Strong = styled.span`
	color: ${(props) => props.theme.palette.text.primary};
	font-weight: 600;
`;
Messages.propTypes = {
	messagesCount: PropTypes.number.isRequired,
};

export default Messages;
