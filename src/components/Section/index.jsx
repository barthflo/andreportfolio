import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = ({ children, light, id }) => {
	return (
		<Container id={id} light={light}>
			{children}
		</Container>
	);
};

const Container = styled.section`
    width: 100%;
    background: ${(props) =>
			props.light && props.theme.palette.background.paper};
	color: ${(props) => props.light && props.theme.palette.text.secondary.dark}
	padding: 0 13px;
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
};

Section.defaultProps = {
	light: false,
	id: '',
};

export default Section;
