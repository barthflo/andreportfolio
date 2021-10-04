import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProgressBar = ({ progress }) => {
	return <Container progress={progress}></Container>;
};

const Container = styled.div`
	height: 2px;
	width: ${(props) => props.progress}%;
	background: ${(props) => props.theme.palette.background.surface.secondary};
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1000;
`;
ProgressBar.propTypes = {
	progress: PropTypes.number.isRequired,
};

export default ProgressBar;
