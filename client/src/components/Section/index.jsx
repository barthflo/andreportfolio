import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = ({ children, light, id, height, ...rest }) => {
	return (
		<Container id={id} light={light} height={height} rest={rest}>
			{children}
		</Container>
	);
};

const Container = styled.section`
	width: 100%;
	height: ${(props) => props.height};
	position: relative;
	background: ${(props) => {
		if (props.light) return props.theme.palette.background.paper;
		if (props.rest.gradient) return props.theme.palette.background.gradient;
	}};
	color: ${(props) =>
		props.light
			? props.theme.palette.text.secondary.dark
			: props.theme.palette.text.secondary.light};
	font-family: ${(props) => props.theme.typography.main};
	padding: 0 13px;
	display: ${(props) => props.rest.flex && 'flex'};
	flex-direction: ${(props) =>
		props.rest.flexDirection && props.rest.flexDirection};
	justify-content: ${(props) =>
		props.rest.justifyContent && props.rest.justifyContent};
	align-items: ${(props) => props.rest.alignItems && props.rest.alignItems};
	& p {
		font-size: 16px;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		padding: 0 20px;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.md}) {
		padding: 0 105px;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.lg}) {
		padding: 0 210px;
	} ;
`;

Section.propTypes = {
	children: PropTypes.node.isRequired,
	light: PropTypes.bool,
	id: PropTypes.string,
	height: PropTypes.string,
};

Section.defaultProps = {
	light: false,
	id: '',
	height: 'auto',
};

export default Section;
