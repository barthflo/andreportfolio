import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BasedButton = ({
	variant,
	onClick,
	type,
	label,
	width,
	minWidth,
	height,
	dark,
	as,
	target,
	download,
	disabled,
	title,
	...rest
}) => {
	return (
		<Button
			type={type}
			onClick={onClick}
			variant={variant}
			width={width}
			minWidth={minWidth}
			height={height}
			dark={dark}
			as={as}
			href={target}
			download={download}
			disabled={disabled}
			target="__blank"
			title={title}
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
    background : ${(props) => {
			if (props.disabled) {
				return '#55544f';
			} else if (props.variant === 'primary') {
				return props.theme.palette.background.surface.secondary;
			} else if (props.variant === 'secondary') {
				return props.theme.palette.background.surface.primary;
			} else if (props.variant === 'warning') {
				return props.theme.palette.action.warning;
			} else {
				return 'none';
			}
		}}
    padding : 7px;
    min-width: ${(props) => props.minWidth};
    font-family : ${(props) => props.theme.typography.main};
    font-size: 16px;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    box-shadow : ${(props) => props.theme.shadows.bottom};
	text-align: center;
`;

BasedButton.propTypes = {
	variant: PropTypes.string,
	onClick: PropTypes.func,
	type: PropTypes.string,
	label: PropTypes.string.isRequired,
	width: PropTypes.string,
	minWidth: PropTypes.string,
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
	minWidth: '230px',
	height: 'fit-content',
	dark: false,
	as: 'button',
	target: '#',
	download: false,
};

export default BasedButton;
