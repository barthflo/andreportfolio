import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SnackBar = ({ content, status, show }) => {
	return (
		<Container status={status} show={show}>
			<Image src={'/megaphone.gif'} alt="animated megaphone" />
			<Content>{content}</Content>
		</Container>
	);
};

const Container = styled.div`
	position: fixed;
	bottom: 5px;
	right: 5px;
	width: calc(100% - 10px);
	padding: 15px 10px;
	margin-bottom: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10000;
	box-shadow: ${(props) => props.theme.shadows.bottom};
	background: ${(props) => {
		if (props.status === 'success') {
			return '#317033';
		}
		if (props.status === 'error') {
			return 'red';
		} else {
			return props.theme.palette.background.surface.primary;
		}
	}};
	border: 2px solid ${(props) => props.theme.palette.border};
	animation: ${(props) =>
		props.show ? 'fade-in 0.5s both' : 'fade-out .5s both'};
	@media (min-width: ${(props) => props.theme.breakpoints.xs}) {
		width: 360px;
	}

	@keyframes fade-in {
		from {
			height: 0;
			opacity: 0;
		}
		to {
			height: auto;
			opacity: 1;
		}
	}
	@keyframes fade-out {
		from {
			height: auto;
			opacity: 1;
		}
		to {
			height: 0;
			opacity: 0;
		}
	}
`;

const Image = styled.img`
	flex-shrink: 1;
	width: 30px;
	height: 30px;
	margin-right: 10px;
`;

const Content = styled.p`
	flex-shrink: 0;
	max-width: 75%;
	margin-left: 10px;
	font-weight: 100;
	font-family: ${(props) => props.theme.typography.opening.subtitle};
`;

SnackBar.propTypes = {
	content: PropTypes.string.isRequired,
	status: PropTypes.oneOf(['default', 'success', 'error']),
	show: PropTypes.bool.isRequired,
};

SnackBar.defaultProps = {
	status: 'default',
};

export default SnackBar;
