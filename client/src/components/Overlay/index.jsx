import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Button';
// import { IoMdClose } from 'react-icons/io';

const Overlay = ({ title, description, close, actionLabel, validate }) => {
	return (
		<Screen>
			{/* <CloseIcon onClick={close}>
				<IoMdClose size="1.8em" />
			</CloseIcon> */}
			<Card>
				<Title>{title}</Title>
				<Content>{description}</Content>
				<Actions>
					<ButtonWrapper>
						<Button label={'Cancel'} dark onClick={close} />
					</ButtonWrapper>
					<ButtonWrapper>
						<Button label={actionLabel} variant="warning" onClick={validate} />
					</ButtonWrapper>
				</Actions>
			</Card>
		</Screen>
	);
};

const Screen = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: 2000;
	background: ${(props) => props.theme.palette.background.transparent};
	display: flex;
	justify-content: center;
	align-items: center;
`;

// const CloseIcon = styled.i`
// 	position: absolute;
// 	top: 10px;
// 	right: 10px;
// 	cursor: pointer;
// `;
const Card = styled.div`
	padding: 20px 40px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-shadow: ${(props) => props.theme.shadows.bottom};
	background: ${(props) => props.theme.palette.background.surface.primary};
`;

const Title = styled.h2`
	font-weight: 600;
	font-size: 1.3em;
	margin-bottom: 20px;
`;

const Content = styled.p`
	text-align: center;
	white-space: pre-wrap;
	margin-bottom: 20px;
`;

const Actions = styled.div`
	display: flex;
`;

const ButtonWrapper = styled.span`
	padding: 0 5px;
`;

Overlay.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	close: PropTypes.func,
	actionLabel: PropTypes.string.isRequired,
	validate: PropTypes.func.isRequired,
};

Overlay.defaultProps = {
	description: '',
	close: () => null,
};

export default Overlay;
