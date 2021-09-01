import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = ({
	children,
	flexDirection,
	justifyContent,
	alignItems,
	flexWrap,
}) => {
	return (
		<Container
			flexDirection={flexDirection}
			justifyContent={justifyContent}
			alignItems={alignItems}
			flexWrap={flexWrap}
		>
			{children}
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	padding: 20px;
	background: ${(props) => props.theme.palette.background.surface.primary};
	box-shadow: ${(props) => props.theme.shadows.bottom};
	margin-bottom: 20px;
	display: flex;
	flex-direction: ${(props) => props.flexDirection};
	justify-content: ${(props) => props.justifyContent};
	align-items: ${(props) => props.alignItems};
	flex-wrap: ${(props) => props.flexWrap};
`;

Card.propTypes = {
	children: PropTypes.node.isRequired,
	flexDirection: PropTypes.string,
	justifyContent: PropTypes.string,
	alignItems: PropTypes.string,
};

Card.defaultProps = {
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	flexWrap: 'wrap',
};

export default Card;
