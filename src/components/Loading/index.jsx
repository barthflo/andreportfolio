import React from 'react';
import styled from 'styled-components';

const Loading = () => {
	return (
		<Container>
			<Image alt="animated loader camera rolling" />
		</Container>
	);
};

const Container = styled.div`
	height: 100%;
	width: 100%;
	background: ${(props) => props.theme.palette.background.gradient};
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
`;

const Image = styled.img.attrs((props) => ({
	src: props.theme.animated.loader,
}))`
	width: 150px;
	height: 150px;
`;
export default Loading;
