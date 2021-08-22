import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BasedButton = ({
	variant,
	onClick,
	type,
	label,
	width,
	height,
	dark,
	as,
	target,
	download,
}) => {
	return (
		<Button
			type={type}
			onClick={onClick}
			variant={variant}
			width={width}
			height={height}
			dark={dark}
			as={as}
			href={target}
			download={download}
			target="__blank"
		>
			{label}
		</Button>
	);
};

const Button = styled.button`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
    border : 1px solid ${(props) => props.theme.palette.border};
    color : ${(props) =>
			props.dark
				? props.theme.palette.text.secondary.light
				: props.theme.palette.text.secondary.dark};
    background : ${(props) =>
			props.variant === 'primary'
				? props.theme.palette.background.surface.secondary
				: 'none'}
    padding : 7px;
    min-width: 230px;
    font-family : ${(props) => props.theme.typography.main};
    font-size: 16px;
    cursor: pointer;
    box-shadow : ${(props) => props.theme.shadows.bottom};
	text-align: center;

`;

BasedButton.propTypes = {
	variant: PropTypes.string,
	onClick: PropTypes.func,
	type: PropTypes.string,
	label: PropTypes.string.isRequired,
	width: PropTypes.string,
	height: PropTypes.string,
	dark: PropTypes.bool,
	as: PropTypes.string,
	target: PropTypes.string,
	download: PropTypes.bool,
};

BasedButton.defaultProps = {
	variant: 'default',
	onClick: () => null,
	type: 'button',
	width: 'fit-content',
	height: 'fit-content',
	dark: false,
	as: 'button',
	target: '#',
	download: false,
};

export default BasedButton;
