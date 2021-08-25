import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl, pictureUrl }) => {
	return (
		<VideoWrapper>
			<Video
				url={videoUrl}
				playsinline
				controls
				light={pictureUrl}
				config={{
					file: {
						attributes: {
							controlsList: 'nodownload',
						},
					},
				}}
				onError={(e) => console.log(e)}
			/>
		</VideoWrapper>
	);
};

const VideoWrapper = styled.section`
	position: relative;
	align-self: flex-start;
	height: 50vh;
	width: 100vw;
	margin-bottom: 10px;
`;

const Video = styled(ReactPlayer)`
	position: absolute;
	top: 0;
	left: 0;
	height: 100% !important;
	width: 100% !important;
	& > video {
		height: 100%;
		width: 100%;
	}
`;

VideoPlayer.propTypes = {
	videoUrl: PropTypes.string.isRequired,
	pictureUrl: PropTypes.string.isRequired,
};

VideoPlayer.defaultProps = {
	videoUrl: '',
};

export default VideoPlayer;
